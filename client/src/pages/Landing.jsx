import React from "react";
import { useAuth } from "../contexts/useAuth";
import { authAPI } from "../services/api";
import {
  ArrowRight,
  Brain,
  Target,
  Star,
  CheckCircle,
  TrendingUp,
  Sparkles,
  PlayCircle,
} from "lucide-react";

const Landing = () => {
  const { login } = useAuth();

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
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute top-40 left-1/3 w-60 h-60 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-slide-up">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-display-2xl text-gray-900 mb-6 max-w-4xl mx-auto px-4">
              Discover Your
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent font-bold drop-shadow-sm">
                {" "}
                Perfect Career
              </span>
              <br />
              in Minutes, Not Years
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
              Take our science-based personality assessment and get personalized
              career recommendations with actionable roadmaps tailored
              specifically for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 px-4">
              <button
                onClick={handleGoogleSignIn}
                className="btn-primary btn-lg flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                <span>Start Your Journey</span>
                <ArrowRight size={20} />
              </button>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CheckCircle size={16} className="text-green-500" />
                <span>Free • 5 minutes • No spam</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-secondary-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-accent-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="font-medium">10,000+ careers discovered</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-display-lg text-gray-900 mb-4">
              Why Choose Pathlight?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our scientifically-backed approach combines psychology with
              real-world data to give you actionable career insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
            <div className="card-interactive p-8 text-center hover:scale-105 transform transition-all duration-300 animate-slide-up">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-display-sm text-gray-900 mb-4">
                Science-Based Assessment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built on the Big Five personality model, validated by decades of
                psychological research and used by top organizations worldwide.
              </p>
            </div>

            <div className="card-interactive p-8 text-center hover:scale-105 transform transition-all duration-300 animate-slide-up [animation-delay:0.1s]">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-display-sm text-gray-900 mb-4">
                Personalized Matches
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get career recommendations that align perfectly with your unique
                personality, interests, and strengths for maximum satisfaction.
              </p>
            </div>

            <div className="card-interactive p-8 text-center hover:scale-105 transform transition-all duration-300 animate-slide-up [animation-delay:0.2s]">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-display-sm text-gray-900 mb-4">
                Actionable Roadmaps
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receive detailed skill development paths with specific steps,
                resources, and timelines to reach your dream career.
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200/50 animate-slide-up mx-4 sm:mx-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-3xl md:text-display-lg bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent font-bold mb-2 drop-shadow-sm">
                  10k+
                </div>
                <p className="text-gray-600 font-medium text-sm md:text-base">
                  Careers Discovered
                </p>
              </div>
              <div>
                <div className="text-3xl md:text-display-lg bg-gradient-to-r from-secondary-500 to-secondary-700 bg-clip-text text-transparent font-bold mb-2 drop-shadow-sm">
                  95%
                </div>
                <p className="text-gray-600 font-medium text-sm md:text-base">
                  Accuracy Rate
                </p>
              </div>
              <div>
                <div className="text-3xl md:text-display-lg bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent font-bold mb-2 drop-shadow-sm">
                  4.9★
                </div>
                <p className="text-gray-600 font-medium text-sm md:text-base">
                  User Rating
                </p>
              </div>
              <div>
                <div className="text-3xl md:text-display-lg text-warning-600 font-bold mb-2">
                  5min
                </div>
                <p className="text-gray-600 font-medium text-sm md:text-base">
                  Assessment Time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-display-lg text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get from confusion to clarity in just three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto px-4">
            <div className="text-center animate-slide-up [animation-delay:0.0s]">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg mb-6">
                1
              </div>
              <h3 className="text-display-sm text-gray-900 mb-4">
                Take Assessment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Answer 20 quick questions about your preferences, work style,
                and interests. No right or wrong answers!
              </p>
            </div>

            <div className="text-center animate-slide-up [animation-delay:0.1s]">
              <div className="w-20 h-20 gradient-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg mb-6">
                2
              </div>
              <h3 className="text-display-sm text-gray-900 mb-4">
                Get Insights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover your personality profile and see how it translates into
                specific career recommendations.
              </p>
            </div>

            <div className="text-center animate-slide-up [animation-delay:0.2s]">
              <div className="w-20 h-20 gradient-accent rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg mb-6">
                3
              </div>
              <h3 className="text-display-sm text-gray-900 mb-4">
                Plan Your Path
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Follow detailed roadmaps with skills, resources, and timelines
                to reach your ideal career.
              </p>
            </div>
          </div>

          <div className="text-center mt-16 animate-slide-up">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 max-w-3xl mx-auto">
              <h3 className="text-display-md text-gray-900 mb-4">
                Ready to Transform Your Career?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands who've already discovered their perfect career
                match.
              </p>
              <button
                onClick={handleGoogleSignIn}
                className="btn-primary btn-lg flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                <span>Get Started Now</span>
                <PlayCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-xl font-bold mb-2">Pathlight</h4>
          <p className="text-gray-400 mb-8">
            Illuminating your path to career success
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              © 2025 Pathlight. Helping you find your perfect career match with
              science-backed insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
