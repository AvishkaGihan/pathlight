import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reportAPI } from "../services/api";
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
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary-500" />
          Your Personality Profile
        </h2>

        <div className="space-y-4">
          {traits.map((trait) => (
            <div key={trait.name} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-32">
                {trait.name}
              </span>
              <div className="flex-1 ml-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${trait.color} h-2.5 rounded-full`}
                    style={{ width: `${trait.value * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-12 text-right">
                {Math.round(trait.value * 100)}%
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Your Holland Codes
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.inferredHollandCodes.map((code) => (
              <span
                key={code}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Career Recommendations Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Your Career Recommendations
        </h2>

        <div className="space-y-6">
          {report.recommendations.map((recommendation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {recommendation.title}
              </h3>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Why it's a good fit:
                </h4>
                <p className="text-gray-600 text-sm">{recommendation.reason}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Key skills to develop:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.skillGaps.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/roadmap/${recommendation.careerId}`}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <span>View detailed roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200">
          <Download className="w-4 h-4" />
          <span>Download PDF Report</span>
        </button>
      </div>
    </div>
  );
};

export default Results;
