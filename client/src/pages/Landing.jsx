import React from "react";
import { useAuth } from "../contexts/useAuth";
import { authAPI } from "../services/api";
import { ArrowRight, Brain, Target, Star } from "lucide-react";

const Landing = () => {
  const { login } = useAuth();

  // Handle the OAuth callback if we have a token in the URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userData = urlParams.get("user");

    if (token && userData) {
      try {
        login(JSON.parse(userData), token);
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [login]);

  const handleGoogleSignIn = () => {
    authAPI.googleAuth();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl font-bold">P</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Your Ideal
              <span className="text-primary-600"> Career Path</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Take a short personality assessment and get personalized career
              recommendations tailored just for you.
            </p>

            <button
              onClick={handleGoogleSignIn}
              className="bg-white border border-gray-300 rounded-lg px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center space-x-2 mx-auto"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Personality Insights
              </h3>
              <p className="text-gray-600">
                Understand your Big Five personality traits and how they relate
                to career success.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Personalized Matches
              </h3>
              <p className="text-gray-600">
                Get career recommendations that align with your unique
                personality profile.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Actionable Roadmaps
              </h3>
              <p className="text-gray-600">
                See exactly what skills you need to develop for each recommended
                career path.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-3 font-semibold">
                  1
                </div>
                <h3 className="font-medium mb-2">Take the Quiz</h3>
                <p className="text-sm text-gray-600">
                  Complete our 20-question personality assessment
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-3 font-semibold">
                  2
                </div>
                <h3 className="font-medium mb-2">Get Insights</h3>
                <p className="text-sm text-gray-600">
                  Discover your personality traits and career matches
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-3 font-semibold">
                  3
                </div>
                <h3 className="font-medium mb-2">Plan Your Path</h3>
                <p className="text-sm text-gray-600">
                  Explore skill roadmaps for your recommended careers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Pathlight. Helping you find your perfect career match.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
