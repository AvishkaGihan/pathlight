import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { reportAPI } from "../services/api";
import Skeleton from "../components/Skeleton";
import {
  Brain,
  ArrowRight,
  Clock,
  BarChart3,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Users,
  Calendar,
} from "lucide-react";

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
        setHasExistingReport(false);
      } finally {
        setLoading(false);
      }
    };

    checkExistingReport();
  }, []);

  if (loading) {
    return <Skeleton.Dashboard />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-display-lg text-gray-900">
              Welcome back, {user.displayName?.split(" ")[0]}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              {hasExistingReport
                ? "Ready to continue your career journey?"
                : "Let's discover your perfect career path together."}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Assessment</p>
                <p className="font-semibold text-gray-900">
                  {hasExistingReport ? "Completed" : "Ready"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Matches</p>
                <p className="font-semibold text-gray-900">
                  {hasExistingReport ? "Available" : "Pending"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Roadmaps</p>
                <p className="font-semibold text-gray-900">
                  {hasExistingReport ? "Ready" : "Coming Soon"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Community</p>
                <p className="font-semibold text-gray-900">10k+ Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Assessment Card */}
        <div className="card-elevated p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 gradient-primary rounded-full opacity-10 -translate-y-8 translate-x-8"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-display-sm text-gray-900">
                  Personality Assessment
                </h2>
                <p className="text-gray-600">
                  {hasExistingReport
                    ? "Update your assessment or view results"
                    : "Discover your work personality in 5 minutes"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>5 minutes</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <BarChart3 className="w-4 h-4" />
                  <span>20 questions</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Science-based Big Five model
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Personalized career matches
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Actionable skill roadmaps
                </span>
              </div>
            </div>

            <Link
              to="/quiz"
              className="btn-primary w-full flex items-center justify-center space-x-3"
            >
              <span>
                {hasExistingReport ? "Retake Assessment" : "Start Assessment"}
              </span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Results Card */}
        <div
          className={`card p-8 relative overflow-hidden transition-all duration-300 ${
            hasExistingReport
              ? "card-elevated hover:scale-105 cursor-pointer"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div
            className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8 ${
              hasExistingReport ? "gradient-secondary" : "bg-gray-300"
            }`}
          ></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                  hasExistingReport ? "gradient-secondary" : "bg-gray-300"
                }`}
              >
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-display-sm text-gray-900">
                  Your Career Insights
                </h2>
                <p className="text-gray-600">
                  {hasExistingReport
                    ? "Explore your personalized recommendations"
                    : "Complete the assessment to unlock insights"}
                </p>
              </div>
            </div>

            {hasExistingReport ? (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Personality profile & traits
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Recommended career paths
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Skill development roadmaps
                    </span>
                  </div>
                </div>

                <Link
                  to="/results"
                  className="btn-secondary w-full flex items-center justify-center space-x-3 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700"
                >
                  <span>View Results</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 opacity-50">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-500">
                      Personality profile & traits
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 opacity-50">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-500">
                      Recommended career paths
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 opacity-50">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-500">
                      Skill development roadmaps
                    </span>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full px-4 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                >
                  Complete Assessment First
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-display-sm text-gray-900 mb-6">
          Explore Career Resources
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/saved-roadmaps"
            className="group p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-accent-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Saved Roadmaps</h4>
            <p className="text-sm text-gray-600 mb-4">
              Access your saved career development plans and track progress.
            </p>
            <div className="flex items-center text-accent-600 text-sm font-medium">
              <span>View Roadmaps</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
            <p className="text-sm text-gray-600 mb-4">
              Connect with others on similar career journeys. Coming soon!
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <span>Coming Soon</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
            <p className="text-sm text-gray-600 mb-4">
              Track your learning milestones and career progress. Coming soon!
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
