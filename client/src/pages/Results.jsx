import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reportAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import { BarChart, ArrowRight, Download, Brain } from "lucide-react";

const Results = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await reportAPI.getLatest();
        if (response.data.success) {
          setReport(response.data.report);
        } else {
          setError("Failed to load your results");
        }
      } catch (error) {
        console.error("Error fetching report:", error);
        setError("Failed to load your results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600"
          >
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No results found
          </h2>
          <p className="text-gray-600 mb-4">
            It looks like you haven't taken the assessment yet.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600"
          >
            <span>Take the Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const traits = [
    {
      name: "Openness",
      value: report.bigFiveScores.openness,
      color: "bg-blue-500",
    },
    {
      name: "Conscientiousness",
      value: report.bigFiveScores.conscientiousness,
      color: "bg-green-500",
    },
    {
      name: "Extraversion",
      value: report.bigFiveScores.extraversion,
      color: "bg-yellow-500",
    },
    {
      name: "Agreeableness",
      value: report.bigFiveScores.agreeableness,
      color: "bg-pink-500",
    },
    {
      name: "Neuroticism",
      value: report.bigFiveScores.neuroticism,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Career Matches
        </h1>
        <p className="text-gray-600">Based on your personality assessment</p>
      </div>

      {/* Personality Profile Section */}
      <Card variant="elevated" className="mb-8">
        <Card.Header>
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-primary-500" strokeWidth={2} />
            <Card.Title>Your Personality Profile</Card.Title>
          </div>
        </Card.Header>

        <Card.Content>
          <div className="space-y-6">
            {traits.map((trait) => (
              <div key={trait.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {trait.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {Math.round(trait.value * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${trait.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${trait.value * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Your Holland Codes
            </h3>
            <div className="flex flex-wrap gap-3">
              {report.inferredHollandCodes.map((code) => (
                <span
                  key={code}
                  className="px-4 py-2 bg-primary-100 text-primary-700 text-sm rounded-full border border-primary-200 font-medium"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Career Recommendations Section */}
      <Card variant="default">
        <Card.Header>
          <Card.Title>Career Recommendations</Card.Title>
          <Card.Description>
            Based on your personality traits and Holland codes
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <div className="space-y-6">
            {report.recommendations.map((recommendation, index) => (
              <Card
                key={index}
                variant="interactive"
                className="border-gray-200"
              >
                <Card.Header>
                  <Card.Title className="text-lg">
                    {recommendation.title}
                  </Card.Title>
                </Card.Header>

                <Card.Content>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Why it's a good fit:
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {recommendation.reason}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Key skills to develop:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.skillGaps.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      as={Link}
                      to={`/roadmap/${recommendation.careerId}`}
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight size={16} />}
                      iconPosition="right"
                    >
                      View detailed roadmap
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Results;
