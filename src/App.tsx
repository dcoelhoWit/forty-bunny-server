import "./App.scss";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseAppConf from "./firebase";
import { parseQuestions, parseVotesQuestions } from "./utils/Parser";
import QuestionPage from "./components/QuestionPage";
import StartPage from "./components/StartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowResultsPage from "./components/ShowResultsPage";
import ResultsPage from "./components/ResultsPage";
import { setActiveQuestion } from "./utils/FirebaseSetter";

// Styles
const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  color: #fff;
`;
const Container = styled.div.attrs({ className: "container" })`
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  // Set Default Active Question: None
  useEffect(() => {
    setActiveQuestion("");
  });

  // Fetch Questions List
  useEffect(() => {
    const database = getDatabase(firebaseAppConf);
    const collectionRef = ref(database, "Questions");

    const fetchData = () => {
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();
        if (dataItem) {
          const parsedQuestions = parseQuestions(dataItem);
          setQuestions(parsedQuestions);
        }
      });
    };

    fetchData();
  }, []);

  // Fetch Answers
  useEffect(() => {
    const database = getDatabase(firebaseAppConf);
    const collectionRef = ref(database, "Votes");

    const fetchData = () => {
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();
        if (dataItem) {
          const parsedQuestions = parseVotesQuestions(dataItem);
          setResults(parsedQuestions);
        }
      });
    };

    fetchData();
  }, []);

  function getPath(index: string) {
    return "/" + index;
  }

  return (
    <AppContainer>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<StartPage results={results}></StartPage>}></Route>
            <Route
              path="/results"
              element={<ShowResultsPage></ShowResultsPage>}
            ></Route>
            <Route
              path="/chart"
              element={<ResultsPage votesQuestions={results}></ResultsPage>}
            ></Route>
            {questions.map((question) => (
              <Route
                path={getPath(question.index)}
                element={<QuestionPage question={question}></QuestionPage>}
              ></Route>
            ))}
          </Routes>
        </Router>
      </Container>
    </AppContainer>
  );
}

export default App;
