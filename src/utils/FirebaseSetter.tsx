import { getDatabase, ref, set } from "firebase/database";

export function setActiveQuestion(index: string) {
  const db = getDatabase();
  set(ref(db, "ActiveQuestion"), {
    indexedDB: index,
  });
}