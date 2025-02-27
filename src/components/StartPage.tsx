import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { resetDB, setActiveQuestion } from "../utils/FirebaseSetter";
import { VoteQuestion } from "../utils/Parser";
import React from "react";

// Style
const Container = styled.div`
  text-align: center;
`;

const Button = styled.button.attrs({ className: "startButton"})`
`;

// Interfaces
interface IStartPageProps {
  results: VoteQuestion[];
}

// Component
export default function StartPage({ results }: IStartPageProps) {

  const navigate = useNavigate();
  function startQuiz() {
    resetDB(results);
    setActiveQuestion("1");
    navigate("/1");
  }

  return (
    <Container>
      <h1>Quiz</h1>
      <Button onClick={startQuiz}>COMEÇAR</Button>
    </Container>
  );
}
