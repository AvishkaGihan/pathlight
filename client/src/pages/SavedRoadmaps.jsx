import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { roadmapAPI } from "../services/api";
import {
  BookOpen,
  Calendar,
  Trash2,
  Eye,
  ArrowLeft,
  AlertCircle,
  X,
  Target,
  Clock,
  TrendingUp,
  CheckCircle,
  Award,
} from "lucide-react";

const SavedRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingRoadmap, setViewingRoadmap] = useState(null);

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

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await roadmapAPI.getAll();
      if (response.data.success) {
        setRoadmaps(response.data.roadmaps);
      }
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      setError("Failed to load saved roadmaps. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteRoadmap = async (id) => {
    if (!confirm("Are you sure you want to delete this roadmap?")) return;

    setDeletingId(id);
    try {
      const response = await roadmapAPI.delete(id);
      if (response.data.success) {
        setRoadmaps(roadmaps.filter((roadmap) => roadmap.id !== id));
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
      setError("Failed to delete roadmap. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const viewRoadmap = (roadmap) => {
    setViewingRoadmap(roadmap);
  };

  const closeView = () => {
    setViewingRoadmap(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderRoadmapContent = (roadmapData) => {
    if (!roadmapData) return null;

    return (
      <div className="space-y-8">
        {/* Summary Section */}
        {roadmapData.totalDuration && (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">
                Learning Timeline
              </h3>
            </div>
            <p className="text-blue-700 text-lg">
              <strong>Total Duration:</strong> {roadmapData.totalDuration}
            </p>
          </div>
        )}

        {/* Key Milestones */}
        {roadmapData.keyMilestones && roadmapData.keyMilestones.length > 0 && (
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-900">
                Key Milestones
              </h3>
            </div>
            <div className="space-y-2">
              {roadmapData.keyMilestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {milestone.atPhase}
                  </div>
                  <span className="text-purple-700">{milestone.milestone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Phases */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Learning Path
          </h2>
          {roadmapData.phases && roadmapData.phases.length > 0 ? (
            roadmapData.phases.map((phase, phaseIndex) => (
              <div
                key={phaseIndex}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {phaseIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-gray-600">{phase.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-700">{phase.objective}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">
                      Learning Steps
                    </h4>
                    {phase.steps && phase.steps.length > 0 ? (
                      phase.steps.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900">
                              {step.title}
                            </h5>
                            <span
                              className={`px-2 py-1 text-xs rounded-full border ${getDifficultyColor(
                                step.difficulty
                              )}`}
                            >
                              {step.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {step.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                            <span>⏱️ {step.estimatedTime}</span>
                          </div>
                          {step.resources && step.resources.length > 0 && (
                            <div className="mb-3">
                              <h6 className="text-sm font-medium text-gray-900 mb-1">
                                Resources:
                              </h6>
                              <ul className="space-y-1">
                                {step.resources.map((resource, resIndex) => (
                                  <li key={resIndex} className="text-sm">
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      {resource.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {step.prerequisites &&
                            step.prerequisites.length > 0 && (
                              <div>
                                <h6 className="text-sm font-medium text-gray-900 mb-1">
                                  Prerequisites:
                                </h6>
                                <ul className="text-sm text-gray-600">
                                  {step.prerequisites.map(
                                    (prereq, prereqIndex) => (
                                      <li key={prereqIndex}>• {prereq}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No steps available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No learning phases available</p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Saved Roadmaps
        </h1>
        <p className="text-gray-600">
          View and manage your saved learning roadmaps.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {roadmaps.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No saved roadmaps yet
          </h3>
          <p className="text-gray-600 mb-6">
            Generate and save detailed roadmaps to view them here.
          </p>
          <Link
            to="/results"
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600"
          >
            <span>Browse Careers</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {roadmap.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Saved {formatDate(roadmap.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => viewRoadmap(roadmap)}
                    className="inline-flex items-center space-x-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => deleteRoadmap(roadmap.id)}
                    disabled={deletingId === roadmap.id}
                    className="inline-flex items-center space-x-2 bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deletingId === roadmap.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Roadmap Modal */}
      {viewingRoadmap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {viewingRoadmap.title}
              </h2>
              <button
                onClick={closeView}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {(() => {
                try {
                  const roadmapData = JSON.parse(viewingRoadmap.content);
                  return renderRoadmapContent(roadmapData);
                } catch (error) {
                  console.error("Error parsing roadmap content:", error);
                  return (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-700">
                        Unable to display roadmap content. The data may be
                        corrupted.
                      </p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedRoadmaps;
