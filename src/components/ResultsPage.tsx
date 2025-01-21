import styled from "styled-components";
import ResultsChart from "./ResultsChart";
import { VoteQuestion } from "../utils/Parser";
import React from "react";

// Style
const Container = styled.div`
  text-align: center;
`;

// Interfaces
interface ResultsPageProps {
  votesQuestions: VoteQuestion[];
}

// Component
export default function ResultsPage({ votesQuestions }: ResultsPageProps) {

  const redScore = votesQuestions.reduce(
    (previousValue, currentValue) => currentValue.votes.red === currentValue.votes.correct ? previousValue + 1 : previousValue,
    0
  );

  const blueScore = votesQuestions.reduce(
    (previousValue, currentValue) => currentValue.votes.blue === currentValue.votes.correct ? previousValue + 1 : previousValue,
    0
  );

  const yellowScore = votesQuestions.reduce(
    (previousValue, currentValue) => currentValue.votes.yellow === currentValue.votes.correct ? previousValue + 1 : previousValue,
    0
  );

  const greenScore = votesQuestions.reduce(
    (previousValue, currentValue) => currentValue.votes.green === currentValue.votes.correct ? previousValue + 1 : previousValue,
    0
  );

  return (
    <Container>
      <h1>Quiz Results</h1>
      <ResultsChart dataSource={[redScore, blueScore, yellowScore, greenScore]}></ResultsChart>
    </Container>
  );
}
