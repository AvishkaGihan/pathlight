import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizAPI } from "../services/api";
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

// Sample questions - in a real app, these would come from your backend
const QUESTIONS = [
  {
    id: 1,
    text: "I see myself as someone who is original, comes up with new ideas.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 2,
    text: "I am someone who does a thorough job.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 3,
    text: "I am someone who is talkative.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 4,
    text: "I am someone who is helpful and unselfish with others.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 5,
    text: "I am someone who can be tense.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 6,
    text: "I am someone who is curious about many different things.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 7,
    text: "I am someone who is a reliable worker.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 8,
    text: "I am someone who is full of energy.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 9,
    text: "I am someone who starts quarrels with others.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 10,
    text: "I am someone who gets nervous easily.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 11,
    text: "I am someone who is an ingenious, deep thinker.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 12,
    text: "I am someone who tends to be lazy.",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 13,
    text: "I am someone who generates a lot of enthusiasm.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 14,
    text: "I am someone who has a forgiving nature.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 15,
    text: "I am someone who worries a lot.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 16,
    text: "I am someone who values artistic, aesthetic experiences.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 17,
    text: "I am someone who persists until the task is finished.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 18,
    text: "I am someone who tends to be quiet.",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 19,
    text: "I am someone who is sometimes rude to others.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 20,
    text: "I am someone who remains calm in tense situations.",
    trait: "neuroticism",
    reversed: true,
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const currentQ = QUESTIONS[currentQuestion];

  const handleAnswer = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Transform answers to match backend schema
      const formattedAnswers = answers.map((score, index) => ({
        questionId: index + 1,
        score,
      }));
      await quizAPI.submit(formattedAnswers);
      navigate("/results");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("There was an error submitting your answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </span>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-gray-400 hover:text-gray-600"
          >
            <HelpCircle size={18} />
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Help Tooltip */}
      {showHelp && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">How to answer</h3>
          <p className="text-blue-700 text-sm">
            Rate how much each statement describes you on a scale from 1
            (Strongly Disagree) to 5 (Strongly Agree). Be honest - there are no
            right or wrong answers!
          </p>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">
          {currentQ.text}
        </h2>

        <div className="grid grid-cols-5 gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleAnswer(score)}
              className={`py-3 px-4 rounded-lg border transition-colors ${
                answers[currentQuestion] === score
                  ? "bg-primary-500 border-primary-500 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:border-primary-300"
              }`}
            >
              {score}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Strongly Disagree</span>
          <span>Neutral</span>
          <span>Strongly Agree</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {currentQuestion === QUESTIONS.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || answers[currentQuestion] === null}
            className="flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600"
          >
            <span>{isSubmitting ? "Submitting..." : "Submit Answers"}</span>
            {!isSubmitting && <ChevronRight size={16} />}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
            className="flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
