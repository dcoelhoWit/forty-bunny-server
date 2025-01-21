import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Question, Option } from "../utils/Parser";
import { useNavigate } from "react-router-dom";
import { setActiveQuestion } from "../utils/FirebaseSetter";

// Interfaces
interface QuestionPageProps {
  question: Question;
}

// Style
const Container = styled.div`
  text-align: center;
`;

const LoaderContainer = styled.div.attrs({ className: "loaderContainer"})`
`;

const Loader = styled.div.attrs({ className: "loader"})`
`;


// Utils
function questionTitle(question: Question): string {
  if (question === undefined) {
    return "";
  }
  return question.index + ". " + question.title;
}

const options = (question: Question) => {
  if (question === undefined) {
    return;
  }
  return question.options.map((option: Option) => (
    <li>
      {option.letter} - {option.value}
    </li>
  ));
};

const invalidPath: string = "";
function getNextPath(question: Question): string {
  if (question !== undefined) {
    const index: number = Number(question.index);
    if (index < 2) {
      const nextIndex = index + 1
      setActiveQuestion(String(nextIndex));
      return "/" + nextIndex;
    } else {
      return "/results";
    }
  }
  setActiveQuestion("");
  return invalidPath;
}

// Component
export default function QuestionPage({ question }: QuestionPageProps) {
  const navigate = useNavigate();
  const initialCount = 15;
  const [timeLeft, setTimeLeft] = useState<number>(initialCount);

  useEffect(() => {
    if (!timeLeft) {
      const nextPath = getNextPath(question);
      if (nextPath !== invalidPath) {
        navigate(nextPath);
        setTimeLeft(initialCount);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate, question]);

  return (
    <Container>
      <LoaderContainer>
        <Loader></Loader>
        <h2>{timeLeft}</h2>
      </LoaderContainer>
      <h1>{questionTitle(question)}</h1>
      <ul>{options(question)}</ul>
    </Container>
  );
}
