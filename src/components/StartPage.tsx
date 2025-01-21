import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setActiveQuestion } from "../utils/FirebaseSetter";

// Style
const Container = styled.div`
  text-align: center;
`;

const Button = styled.button.attrs({ className: "startButton"})`
`;

// Component
export default function StartPage() {

  const navigate = useNavigate();
  function startQuiz() {
    setActiveQuestion("1");
    navigate("/1");
  }

  return (
    <Container>
      <h1>Quiz</h1>
      <Button onClick={startQuiz}>START</Button>
    </Container>
  );
}
