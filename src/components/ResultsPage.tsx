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

  const redScoreList: number[] = votesQuestions.map((question) => {
    if(question.votes.red === undefined) {
      return 0;
    }
    return question.votes.red === question.votes.correct ? 1 : 0;
  });
  const redScore = redScoreList.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const blueScoreList: number[] = votesQuestions.map((question) => {
    if(question.votes.blue === undefined) {
      return 0;
    }
    return question.votes.blue === question.votes.correct ? 1 : 0;
  });
  const blueScore = blueScoreList.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const yellowScoreList: number[] = votesQuestions.map((question) => {
    if(question.votes.yellow === undefined) {
      return 0;
    }
    return question.votes.yellow === question.votes.correct ? 1 : 0;
  });
  const yellowScore = yellowScoreList.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const greenScoreList: number[] = votesQuestions.map((question) => {
    if(question.votes.green === undefined) {
      return 0;
    }

    return question.votes.green === question.votes.correct ? 1 : 0;
  });
  const greenScore = greenScoreList.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const scores = [redScore, blueScore, yellowScore, greenScore];

  return (
    <Container>
      <h1>Quiz Results</h1>
      <ResultsChart dataSource={scores}></ResultsChart>
    </Container>
  );
}
