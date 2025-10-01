import React, { useState } from "react";

const Question = ({ data, handleAnswer, current, total }) => {
  const [selected, setSelected] = useState("");

  const submitAnswer = () => {
    if (!selected) {
      alert("Please select an option!");
      return;
    }
    handleAnswer(selected);
    setSelected("");
  };

  return (
    <div>
      <h3>
        Question {current} of {total}
      </h3>
      <p>{data.question}</p>
      <div>
        {data.options.map((option, index) => (
          <label key={index} style={{ display: "block", margin: "5px 0" }}>
            <input
              type="radio"
              name="quiz-option"
              value={option}
              checked={selected === option}
              onChange={(e) => setSelected(e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={submitAnswer} style={{ marginTop: "10px" }}>
        Next
      </button>
    </div>
  );
};

export default Question;
