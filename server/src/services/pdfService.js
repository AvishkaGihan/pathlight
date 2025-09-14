import puppeteer from "puppeteer";

export const generateRoadmapPDF = async (roadmapData) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Generate HTML content for the PDF
    const htmlContent = generateRoadmapHTML(roadmapData);

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "1in",
        right: "1in",
        bottom: "1in",
        left: "1in",
      },
      displayHeaderFooter: false,
      preferCSSPageSize: false,
    });

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const generateRoadmapHTML = (roadmapData) => {
  const roadmap = JSON.parse(roadmapData.content);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${roadmapData.title} - Pathlight Career Roadmap</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background: white;
            }

            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 3px solid #3B82F6;
                padding-bottom: 20px;
            }

            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #3B82F6;
                margin-bottom: 10px;
            }

            .title {
                font-size: 24px;
                font-weight: bold;
                color: #1F2937;
                margin-bottom: 5px;
            }

            .subtitle {
                color: #6B7280;
                font-size: 14px;
            }

            .summary {
                background: #F3F4F6;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
            }

            .summary-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #E5E7EB;
            }

            .summary-item:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }

            .summary-label {
                font-weight: 600;
                color: #374151;
            }

            .summary-value {
                color: #6B7280;
            }

            .milestones {
                background: #FAF5FF;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
                border-left: 4px solid #8B5CF6;
            }

            .milestones h3 {
                color: #7C3AED;
                margin-bottom: 15px;
                font-size: 18px;
            }

            .milestone {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }

            .milestone-number {
                width: 24px;
                height: 24px;
                background: #8B5CF6;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                margin-right: 12px;
                flex-shrink: 0;
            }

            .milestone-text {
                color: #6B7280;
            }

            .phase {
                margin-bottom: 30px;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                overflow: hidden;
                page-break-inside: avoid;
            }

            .phase-header {
                background: linear-gradient(135deg, #3B82F6, #8B5CF6);
                color: white;
                padding: 20px;
            }

            .phase-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .phase-objective {
                opacity: 0.9;
                margin-bottom: 10px;
            }

            .phase-duration {
                font-size: 14px;
                opacity: 0.8;
            }

            .phase-content {
                padding: 20px;
            }

            .step {
                margin-bottom: 20px;
                padding: 15px;
                background: #F9FAFB;
                border-radius: 6px;
                border-left: 3px solid #3B82F6;
            }

            .step-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
            }

            .step-title {
                font-size: 16px;
                font-weight: bold;
                color: #1F2937;
                flex: 1;
            }

            .step-meta {
                display: flex;
                gap: 10px;
                flex-shrink: 0;
            }

            .step-badge {
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }

            .step-badge.beginner {
                background: #DCFCE7;
                color: #166534;
                border: 1px solid #BBF7D0;
            }

            .step-badge.intermediate {
                background: #FEF3C7;
                color: #92400E;
                border: 1px solid #FDE68A;
            }

            .step-badge.advanced {
                background: #FEE2E2;
                color: #991B1B;
                border: 1px solid #FECACA;
            }

            .step-description {
                color: #4B5563;
                margin-bottom: 12px;
            }

            .step-time {
                color: #6B7280;
                font-size: 14px;
                margin-bottom: 12px;
            }

            .prerequisites, .resources {
                margin-top: 12px;
            }

            .prerequisites h4, .resources h4 {
                font-size: 14px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 5px;
            }

            .prerequisites ul, .resources ul {
                margin-left: 15px;
            }

            .prerequisites li, .resources li {
                color: #6B7280;
                margin-bottom: 3px;
                font-size: 14px;
            }

            .resource-link {
                color: #2563EB;
                text-decoration: none;
            }

            .resource-link:hover {
                text-decoration: underline;
            }

            .footer {
                margin-top: 40px;
                text-align: center;
                color: #9CA3AF;
                font-size: 12px;
                border-top: 1px solid #E5E7EB;
                padding-top: 20px;
            }

            @media print {
                .phase {
                    page-break-inside: avoid;
                }

                .step {
                    page-break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">Pathlight</div>
            <div class="title">${roadmapData.title}</div>
            <div class="subtitle">Generated on ${new Date(
              roadmapData.createdAt
            ).toLocaleDateString()}</div>
        </div>

        ${
          roadmap.totalDuration ||
          (roadmap.keyMilestones && roadmap.keyMilestones.length > 0)
            ? `
        <div class="summary">
            ${
              roadmap.totalDuration
                ? `
            <div class="summary-item">
                <span class="summary-label">Total Duration:</span>
                <span class="summary-value">${roadmap.totalDuration}</span>
            </div>
            `
                : ""
            }

            ${
              roadmap.keyMilestones && roadmap.keyMilestones.length > 0
                ? `
            <div class="summary-item">
                <span class="summary-label">Key Milestones:</span>
                <span class="summary-value">${roadmap.keyMilestones.length} milestones</span>
            </div>
            `
                : ""
            }
        </div>
        `
            : ""
        }

        ${
          roadmap.keyMilestones && roadmap.keyMilestones.length > 0
            ? `
        <div class="milestones">
            <h3>Key Milestones</h3>
            ${roadmap.keyMilestones
              .map(
                (milestone) => `
            <div class="milestone">
                <div class="milestone-number">${milestone.atPhase}</div>
                <div class="milestone-text">${milestone.milestone}</div>
            </div>
            `
              )
              .join("")}
        </div>
        `
            : ""
        }

        ${
          roadmap.phases && roadmap.phases.length > 0
            ? `
        <div class="phases">
            ${roadmap.phases
              .map(
                (phase, phaseIndex) => `
            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase ${phaseIndex + 1}: ${
                  phase.title
                }</div>
                    ${
                      phase.objective
                        ? `<div class="phase-objective">${phase.objective}</div>`
                        : ""
                    }
                    ${
                      phase.duration
                        ? `<div class="phase-duration">Duration: ${phase.duration}</div>`
                        : ""
                    }
                </div>

                <div class="phase-content">
                    ${
                      phase.steps && phase.steps.length > 0
                        ? phase.steps
                            .map(
                              (step, stepIndex) => `
                    <div class="step">
                        <div class="step-header">
                            <div class="step-title">${step.title}</div>
                            <div class="step-meta">
                                ${
                                  step.estimatedTime
                                    ? `<span class="step-badge">${step.estimatedTime}</span>`
                                    : ""
                                }
                                ${
                                  step.difficulty
                                    ? `<span class="step-badge ${step.difficulty.toLowerCase()}">${
                                        step.difficulty
                                      }</span>`
                                    : ""
                                }
                            </div>
                        </div>

                        ${
                          step.description
                            ? `<div class="step-description">${step.description}</div>`
                            : ""
                        }

                        ${
                          step.prerequisites && step.prerequisites.length > 0
                            ? `
                        <div class="prerequisites">
                            <h4>Prerequisites:</h4>
                            <ul>
                                ${step.prerequisites
                                  .map((prereq) => `<li>${prereq}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                        `
                            : ""
                        }

                        ${
                          step.resources && step.resources.length > 0
                            ? `
                        <div class="resources">
                            <h4>Resources:</h4>
                            <ul>
                                ${step.resources
                                  .map(
                                    (resource) => `
                                <li>
                                    <a class="resource-link" href="${
                                      resource.url || "#"
                                    }">${resource.title || resource}</a>
                                </li>
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>
                        `
                            : ""
                        }
                    </div>
                    `
                            )
                            .join("")
                        : "<p>No steps available for this phase.</p>"
                    }
                </div>
            </div>
            `
              )
              .join("")}
        </div>
        `
            : "<p>No learning phases available.</p>"
        }

        <div class="footer">
            <p>Generated by Pathlight - Your Career Development Companion</p>
            <p>© ${new Date().getFullYear()} Pathlight. All rights reserved.</p>
        </div>
    </body>
    </html>
  `;
};
