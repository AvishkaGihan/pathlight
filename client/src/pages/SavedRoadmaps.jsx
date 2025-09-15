import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { roadmapAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
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
  Download,
} from "lucide-react";

const SavedRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingRoadmap, setViewingRoadmap] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

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

  const downloadRoadmapPDF = async (roadmapId, roadmapTitle) => {
    setDownloadingId(roadmapId);
    try {
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
      a.download = `${roadmapTitle
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}_roadmap.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setError("Failed to download PDF. Please try again.");
    } finally {
      setDownloadingId(null);
    }
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
      <div className="space-y-6">
        {/* Summary Section */}
        {roadmapData.totalDuration && (
          <Card variant="gradient" className="border-primary-200">
            <Card.Content>
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-primary-600" strokeWidth={2} />
                <h3 className="text-lg font-semibold text-primary-900">
                  Learning Timeline
                </h3>
              </div>
              <p className="text-primary-700 text-lg font-medium">
                <strong>Total Duration:</strong> {roadmapData.totalDuration}
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Key Milestones */}
        {roadmapData.keyMilestones && roadmapData.keyMilestones.length > 0 && (
          <Card variant="default">
            <Card.Header>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-secondary-600" strokeWidth={2} />
                <Card.Title>Key Milestones</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {roadmapData.keyMilestones.map((milestone, index) => (
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
                ))}
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Learning Phases */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Learning Path
          </h2>
          {roadmapData.phases && roadmapData.phases.length > 0 ? (
            roadmapData.phases.map((phase, phaseIndex) => (
              <Card
                key={phaseIndex}
                variant="elevated"
                className="overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white p-6 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {phaseIndex + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{phase.title}</h3>
                        <p className="text-primary-100 mt-1">
                          {phase.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-black bg-opacity-30 rounded-lg px-3 py-1 backdrop-blur-sm">
                        <span className="text-sm font-medium text-white">
                          {phase.steps?.length || 0} steps
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Card.Content className="space-y-4">
                  <div className="mb-4">
                    <p className="text-gray-700 text-lg">{phase.objective}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Learning Steps
                    </h4>
                    {phase.steps && phase.steps.length > 0 ? (
                      phase.steps.map((step, stepIndex) => (
                        <Card
                          key={stepIndex}
                          variant="interactive"
                          className="border-gray-100"
                        >
                          <Card.Content>
                            <div className="flex items-start justify-between mb-3">
                              <h5 className="text-lg font-semibold text-gray-900">
                                {step.title}
                              </h5>
                              <span
                                className={`px-3 py-1 text-xs rounded-full border font-medium ${getDifficultyColor(
                                  step.difficulty
                                )}`}
                              >
                                {step.difficulty}
                              </span>
                            </div>

                            <p className="text-gray-600 mb-4">
                              {step.description}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{step.estimatedTime}</span>
                              </span>
                            </div>

                            {step.resources && step.resources.length > 0 && (
                              <div className="mb-4">
                                <h6 className="text-sm font-medium text-gray-700 mb-2">
                                  Resources:
                                </h6>
                                <div className="space-y-2">
                                  {step.resources.map((resource, resIndex) => (
                                    <a
                                      key={resIndex}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-2 text-sm bg-secondary-50 text-secondary-700 px-3 py-2 rounded-full border border-secondary-200 hover:bg-secondary-100 transition-colors"
                                    >
                                      <Target className="w-3 h-3" />
                                      <span>{resource.title}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            {step.prerequisites &&
                              step.prerequisites.length > 0 && (
                                <div>
                                  <h6 className="text-sm font-medium text-gray-700 mb-2">
                                    Prerequisites:
                                  </h6>
                                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                    {step.prerequisites.map(
                                      (prereq, prereqIndex) => (
                                        <li key={prereqIndex}>{prereq}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </Card.Content>
                        </Card>
                      ))
                    ) : (
                      <Card variant="outline">
                        <Card.Content>
                          <p className="text-gray-500 text-center py-4">
                            No steps available
                          </p>
                        </Card.Content>
                      </Card>
                    )}
                  </div>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Card variant="outline">
              <Card.Content>
                <p className="text-gray-500 text-center py-8">
                  No learning phases available
                </p>
              </Card.Content>
            </Card>
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
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          <span>Back to Dashboard</span>
        </Link>

        <Card variant="default" className="mb-6">
          <Card.Header>
            <Card.Title className="text-3xl">Saved Roadmaps</Card.Title>
            <Card.Description>
              View and manage your saved learning roadmaps.
            </Card.Description>
          </Card.Header>
        </Card>
      </div>

      {error && (
        <Card variant="outline" className="mb-6 border-red-200 bg-red-50">
          <Card.Content>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          </Card.Content>
        </Card>
      )}

      {roadmaps.length === 0 ? (
        <Card variant="default">
          <Card.Content>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <Card.Title className="mb-2">No saved roadmaps yet</Card.Title>
              <Card.Description className="mb-6">
                Generate and save detailed roadmaps to view them here.
              </Card.Description>
              <Button as={Link} to="/results" variant="primary" size="lg">
                Browse Careers
              </Button>
            </div>
          </Card.Content>
        </Card>
      ) : (
        <div className="space-y-4">
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.id} variant="interactive">
              <Card.Content>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Card.Title className="text-lg mb-2">
                      {roadmap.title}
                    </Card.Title>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Saved {formatDate(roadmap.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={() => viewRoadmap(roadmap)}
                      variant="outline"
                      size="sm"
                      icon={<Eye size={16} />}
                    >
                      View
                    </Button>
                    <Button
                      onClick={() =>
                        downloadRoadmapPDF(roadmap.id, roadmap.title)
                      }
                      disabled={downloadingId === roadmap.id}
                      loading={downloadingId === roadmap.id}
                      variant="success"
                      size="sm"
                      icon={<Download size={16} />}
                    >
                      Download PDF
                    </Button>
                    <Button
                      onClick={() => deleteRoadmap(roadmap.id)}
                      disabled={deletingId === roadmap.id}
                      loading={deletingId === roadmap.id}
                      variant="danger"
                      size="sm"
                      icon={<Trash2 size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}

      {/* View Roadmap Modal */}
      {viewingRoadmap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-xl font-semibold text-gray-900">
                {viewingRoadmap.title}
              </h2>
              <button
                onClick={closeView}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
