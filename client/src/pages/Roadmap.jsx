import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { careerAPI, roadmapAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  ArrowLeft,
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  CheckCircle,
  Calendar,
  Award,
  ExternalLink,
} from "lucide-react";

const Roadmap = () => {
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailedLoading, setDetailedLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fetchDetailedRoadmap = async () => {
    if (!career || career.detailedRoadmap) return;

    setDetailedLoading(true);
    try {
      const response = await careerAPI.getDetailedRoadmap(careerId);
      if (response.data.success) {
        setCareer((prev) => ({
          ...prev,
          detailedRoadmap: response.data.career.detailedRoadmap,
        }));
      }
    } catch (error) {
      console.error("Error fetching detailed roadmap:", error);
      setError("Failed to generate detailed roadmap. Please try again.");
    } finally {
      setDetailedLoading(false);
    }
  };

  const saveRoadmap = async () => {
    if (!career || !career.detailedRoadmap) return;

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const title = `${career.title} Learning Roadmap`;
      const content = JSON.stringify(career.detailedRoadmap);

      const response = await roadmapAPI.create(title, content);
      if (response.data.success) {
        setSaveSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving roadmap:", error);
      setSaveError("Failed to save roadmap. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const downloadRoadmapPDF = async () => {
    if (!career || !career.detailedRoadmap) return;

    setDownloading(true);
    try {
      // First save the roadmap
      const title = `${career.title} Learning Roadmap`;
      const content = JSON.stringify(career.detailedRoadmap);

      const saveResponse = await roadmapAPI.create(title, content);
      if (saveResponse.data.success) {
        const roadmapId = saveResponse.data.roadmap.id;

        // Then download the PDF
        const response = await fetch(`/api/v1/roadmaps/${roadmapId}/pdf`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to download PDF");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()}_roadmap.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setSaveError("Failed to download PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await careerAPI.getRoadmap(careerId);
        if (response.data.success) {
          setCareer(response.data.career);
        } else {
          setError("Failed to load career roadmap");
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setError("Failed to load career roadmap. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [careerId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-500" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error || "Career not found"}</p>
          <Link
            to="/results"
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            <span>Back to Results</span>
          </Link>
        </div>
      </div>
    );
  }

  // Group skills into categories for better organization (fallback for basic roadmap)
  const skillCategories = [
    {
      title: "Fundamentals",
      skills: career.coreSkills.slice(
        0,
        Math.ceil(career.coreSkills.length / 3)
      ),
      icon: <Target className="w-5 h-5 text-blue-500" strokeWidth={2} />,
    },
    {
      title: "Core Technologies",
      skills: career.coreSkills.slice(
        Math.ceil(career.coreSkills.length / 3),
        Math.ceil((career.coreSkills.length * 2) / 3)
      ),
      icon: <BookOpen className="w-5 h-5 text-green-500" strokeWidth={2} />,
    },
    {
      title: "Advanced Concepts",
      skills: career.coreSkills.slice(
        Math.ceil((career.coreSkills.length * 2) / 3)
      ),
      icon: <TrendingUp className="w-5 h-5 text-purple-500" strokeWidth={2} />,
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderDetailedRoadmap = () => {
    if (!career.detailedRoadmap) return null;

    return (
      <div className="space-y-6">
        {/* Summary Section */}
        {career.detailedRoadmap.totalDuration && (
          <Card variant="gradient" className="border-primary-200">
            <Card.Content>
              <div className="flex items-center space-x-3 mb-3">
                <Calendar
                  className="w-6 h-6 text-primary-600"
                  strokeWidth={2}
                />
                <h3 className="text-lg font-semibold text-primary-900">
                  Learning Timeline
                </h3>
              </div>
              <p className="text-primary-700 text-lg font-medium">
                <strong>Total Duration:</strong>{" "}
                {career.detailedRoadmap.totalDuration}
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Key Milestones */}
        {career.detailedRoadmap.keyMilestones &&
          career.detailedRoadmap.keyMilestones.length > 0 && (
            <Card variant="default">
              <Card.Header>
                <div className="flex items-center space-x-3">
                  <Award
                    className="w-6 h-6 text-secondary-600"
                    strokeWidth={2}
                  />
                  <Card.Title>Key Milestones</Card.Title>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {career.detailedRoadmap.keyMilestones.map(
                    (milestone, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-secondary-100 border border-secondary-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-secondary-700">
                            {milestone.atPhase}
                          </span>
                        </div>
                        <span className="text-gray-700 font-medium">
                          {milestone.milestone}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </Card.Content>
            </Card>
          )}

        {/* Learning Phases */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Learning Path
          </h2>

          {career.detailedRoadmap.phases.map((phase, phaseIndex) => (
            <Card
              key={phaseIndex}
              variant="elevated"
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white p-6 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {phase.title.toLowerCase().includes("phase")
                        ? phase.title
                        : `Phase ${phaseIndex + 1}: ${phase.title}`}
                    </h3>
                    <p className="text-primary-100 mb-2">{phase.objective}</p>
                    {phase.duration && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" strokeWidth={2} />
                        <span className="text-sm font-medium">
                          {phase.duration}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="bg-black bg-opacity-30 rounded-lg px-3 py-1 backdrop-blur-sm">
                      <span className="text-sm font-medium text-white">
                        {phase.steps.length} steps
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Card.Content className="space-y-4">
                {phase.steps.map((step, stepIndex) => (
                  <Card
                    key={stepIndex}
                    variant="interactive"
                    className="border-gray-100"
                  >
                    <Card.Content>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-100 border border-primary-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-700">
                              {stepIndex + 1}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {step.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {step.estimatedTime && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                  {step.estimatedTime}
                                </span>
                              )}
                              {step.difficulty && (
                                <span
                                  className={`text-xs font-medium px-3 py-1 rounded-full border ${getDifficultyColor(
                                    step.difficulty
                                  )}`}
                                >
                                  {step.difficulty}
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">
                            {step.description}
                          </p>

                          {step.prerequisites &&
                            step.prerequisites.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-2">
                                  Prerequisites:
                                </h5>
                                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                  {step.prerequisites.map(
                                    (prereq, prereqIndex) => (
                                      <li key={prereqIndex}>{prereq}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {step.resources && step.resources.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-3">
                                Recommended Resources:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {step.resources.map(
                                  (resource, resourceIndex) => (
                                    <a
                                      key={resourceIndex}
                                      href={
                                        resource.url ||
                                        `https://www.google.com/search?q=${encodeURIComponent(
                                          resource.title || resource
                                        )}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-2 text-sm bg-secondary-50 text-secondary-700 px-3 py-2 rounded-full border border-secondary-200 hover:bg-secondary-100 transition-colors"
                                    >
                                      <ExternalLink
                                        className="w-3 h-3"
                                        strokeWidth={2}
                                      />
                                      <span>{resource.title || resource}</span>
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderBasicRoadmap = () => {
    return (
      <div className="space-y-6">
        {skillCategories.map((category, index) => (
          <Card key={index} variant="default">
            <Card.Header>
              <div className="flex items-center space-x-3">
                {category.icon}
                <Card.Title>{category.title}</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="grid gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-medium text-gray-600">
                        {skillIndex + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/results"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2} />
        <span>Back to Results</span>
      </Link>

      <Card variant="default" className="mb-8">
        <Card.Header>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <Card.Title className="text-3xl mb-2">
                {career.title} Roadmap
              </Card.Title>
              <Card.Description className="text-lg">
                {career.description}
              </Card.Description>
            </div>

            {career.averageSalary &&
              career.averageSalary.min &&
              career.averageSalary.max && (
                <div className="bg-primary-50 rounded-lg p-4 mt-4 md:mt-0 md:ml-6 border border-primary-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock
                      className="w-4 h-4 text-primary-500"
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium text-primary-700">
                      Average Salary
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-primary-900">
                    ${career.averageSalary.min.toLocaleString()} - $
                    {career.averageSalary.max.toLocaleString()}
                  </p>
                </div>
              )}
          </div>
        </Card.Header>

        <Card.Content>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {career.detailedRoadmap
                ? "Detailed Learning Roadmap"
                : "Learning Path"}
            </h2>
            <div className="flex items-center space-x-3">
              {career.detailedRoadmap && (
                <>
                  <Button
                    onClick={saveRoadmap}
                    disabled={saving}
                    loading={saving}
                    variant="success"
                    size="sm"
                  >
                    {saving ? "Saving..." : "Save Roadmap"}
                  </Button>
                  <Button
                    onClick={downloadRoadmapPDF}
                    disabled={downloading}
                    loading={downloading}
                    variant="outline"
                    size="sm"
                  >
                    {downloading ? "Downloading..." : "Download PDF"}
                  </Button>
                </>
              )}
              {!career.detailedRoadmap && (
                <Button
                  onClick={fetchDetailedRoadmap}
                  disabled={detailedLoading}
                  loading={detailedLoading}
                  variant="primary"
                  size="sm"
                >
                  {detailedLoading
                    ? "Generating..."
                    : "Get AI-Powered Detailed Roadmap"}
                </Button>
              )}
            </div>
          </div>

          {saveSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">
                  Roadmap saved successfully!
                </span>
              </div>
            </div>
          )}

          {saveError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-red-800">{saveError}</span>
              </div>
            </div>
          )}

          {career.detailedRoadmap
            ? renderDetailedRoadmap()
            : renderBasicRoadmap()}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Roadmap;
