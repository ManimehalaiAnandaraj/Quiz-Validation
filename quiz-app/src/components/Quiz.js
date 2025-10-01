import React, { useState, useEffect, useCallback } from "react";
import Question from "./Question";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Control Style Syntax",
    ],
    answer: "Cascading Style Sheets",
  },
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question

  const handleAnswer = useCallback(
    (selected) => {
      if (selected === questions[currentQ].answer) {
        setScore((prev) => prev + 1);
      }

      const nextQ = currentQ + 1;
      if (nextQ < questions.length) {
        setCurrentQ(nextQ);
        setTimeLeft(15);
      } else {
        setShowResult(true);
      }
    },
    [currentQ]
  );

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(""); // Auto move if no answer
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, handleAnswer]);

  const progress = ((currentQ + 1) / questions.length) * 100;

  // 🔄 Restart Quiz Function
  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      {!showResult ? (
        <>
          {/* Progress Bar */}
          <div
            style={{
              background: "#ddd",
              height: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#4caf50",
                borderRadius: "5px",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>

          {/* Timer */}
          <p style={{ fontWeight: "bold" }}>⏳ Time Left: {timeLeft}s</p>

          <Question
            data={questions[currentQ]}
            handleAnswer={handleAnswer}
            current={currentQ + 1}
            total={questions.length}
          />
        </>
      ) : (
        <div>
          <h2>Quiz Finished!</h2>
          <p>
            🎉 You scored <b>{score}</b> out of <b>{questions.length}</b>
          </p>
          <button
            onClick={restartQuiz}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🔄 Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;

