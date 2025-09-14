import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { reportAPI } from "../services/api";
import { Brain, ArrowRight, Clock, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [hasExistingReport, setHasExistingReport] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExistingReport = async () => {
      try {
        const response = await reportAPI.getLatest();
        if (response.data.success) {
          setHasExistingReport(true);
        }
      } catch {
        // No existing report is fine - this is the typical case for new users
        setHasExistingReport(false);
      } finally {
        setLoading(false);
      }
    };

    checkExistingReport();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.displayName}!
        </h1>
        <p className="text-gray-600">
          {hasExistingReport
            ? "Ready to continue your career discovery journey?"
            : "Ready to discover your ideal career path?"}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Personality Assessment
            </h2>
            <p className="text-gray-600 mb-4">
              {hasExistingReport
                ? "Take the assessment again to update your results or view your previous recommendations."
                : "Our 20-question quiz will help us understand your work preferences and personality traits."}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>5 minutes</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4" />
                <span>20 questions</span>
              </div>
            </div>
            <Link
              to="/quiz"
              className="inline-flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <span>
                {hasExistingReport ? "Retake Assessment" : "Start the Quiz"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {hasExistingReport && (
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            View Your Previous Results
          </h3>
          <p className="text-blue-700 mb-4">
            Already took the assessment? Check out your personalized career
            recommendations.
          </p>
          <Link
            to="/results"
            className="inline-flex items-center space-x-2 bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span>View Results</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
