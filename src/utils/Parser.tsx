import { StringMappingType } from "typescript";

export interface Question {
  index: string;
  title: string;
  options: Option[];
}

export interface Option {
  letter: string;
  value: string;
}

export interface VoteQuestion {
  index: string;
  votes: Votes;
}

export function parseQuestions(input: any): Question[] {
  const questionsList = Object.keys(input).map((value) => {
    const index: string = value;
    const details: QuestionDetailsParser = parseQuestionDetails(input[index]);
    const question: Question = {
      index: index,
      title: details.title,
      options: details.options,
    };
    return question;
  });
  return questionsList;
}

export function parseVotesQuestions(input: any): VoteQuestion[] {
  const votesQuestions = Object.keys(input).map((value) => {
    const index: string = value;
    const voteQuestion: VoteQuestion = {
      index: index,
      votes: parseVotes(input[index]),
    }
    return voteQuestion;
  });
  return votesQuestions;
}

// PRIVATE

interface QuestionDetailsParser {
  title: string;
  options: Option[];
}

interface Votes {
  red: string;
  blue: string;
  green: string;
  yellow: string;
  correct: string;
}

function parseQuestionDetails(input: any): QuestionDetailsParser {
  const detailsList = Object.keys(input).map((key) => {
    const details: QuestionDetailsParser = {
      title: key,
      options: parseOptions(input[key]),
    };
    return details;
  });
  return detailsList[0];
}


function parseOptions(input: any): Option[] {
  const options = Object.keys(input).map((key) => {
    const option: Option = {
      letter: key,
      value: input[key],
    };
    return option;
  });
  return options;
}

function parseVotes(input: any): Votes {
  const votes: Votes = {
    red: input["Red"],
    blue: input["Blue"],
    green: input["Green"],
    yellow: input["Yellow"],
    correct: input["Correct"], 
  };
  return votes
}

