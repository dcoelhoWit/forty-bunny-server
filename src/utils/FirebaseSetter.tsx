import { getDatabase, ref, set, update } from "firebase/database";
import { VoteQuestion } from "./Parser";

export function setActiveQuestion(index: string) {
  const db = getDatabase();
  set(ref(db, "ActiveQuestion"), {
    index,
  });
}

export function resetDB(voteQuestions: VoteQuestion[]) {
  voteQuestions.forEach((voteQuestion) => {
    setAnswer(voteQuestion.index, "", "Red");
    setAnswer(voteQuestion.index, "", "Blue");
    setAnswer(voteQuestion.index, "", "Yellow");
    setAnswer(voteQuestion.index, "", "Green");
  });
}

export function setAnswer(questionIndex: string, answer: string, team: string) {
  const db = getDatabase();

  update(ref(db, "Votes/" + questionIndex), {
    [team]: answer,
  });
}
