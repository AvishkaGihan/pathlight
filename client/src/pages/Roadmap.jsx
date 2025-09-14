import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { careerAPI } from "../services/api";
import { ArrowLeft, BookOpen, Target, Clock, TrendingUp } from "lucide-react";

const Roadmap = () => {
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <BookOpen className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error || "Career not found"}</p>
          <Link
            to="/results"
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results</span>
          </Link>
        </div>
      </div>
    );
  }

  // Group skills into categories for better organization
  const skillCategories = [
    {
      title: "Fundamentals",
      skills: career.coreSkills.slice(
        0,
        Math.ceil(career.coreSkills.length / 3)
      ),
      icon: <Target className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Core Technologies",
      skills: career.coreSkills.slice(
        Math.ceil(career.coreSkills.length / 3),
        Math.ceil((career.coreSkills.length * 2) / 3)
      ),
      icon: <BookOpen className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Advanced Concepts",
      skills: career.coreSkills.slice(
        Math.ceil((career.coreSkills.length * 2) / 3)
      ),
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/results"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Results</span>
      </Link>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {career.title} Roadmap
            </h1>
            <p className="text-gray-600">{career.description}</p>
          </div>

          {career.averageSalary && (
            <div className="bg-blue-50 rounded-lg p-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  Average Salary
                </span>
              </div>
              <p className="text-lg font-semibold text-blue-900">
                ${career.averageSalary.min.toLocaleString()} - $
                {career.averageSalary.max.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Learning Path
          </h2>

          <div className="space-y-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-6">
                <div className="flex items-center space-x-2 mb-4">
                  {category.icon}
                  <h3 className="text-lg font-medium text-gray-900">
                    {category.title}
                  </h3>
                </div>

                <div className="grid gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-gray-600">
                          {skillIndex + 1}
                        </span>
                      </div>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Ready to get started?
        </h3>
        <p className="text-blue-700 mb-4">
          Begin with the fundamentals and work your way through each category.
          Consistent practice is key to mastering these skills.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
            Find Online Courses
          </button>
          <button className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-blue-50">
            Explore Learning Resources
          </button>
          <button className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-blue-50">
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
