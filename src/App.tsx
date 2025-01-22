import "./App.scss";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseAppConf from "./firebase";
import { parseQuestions, parseVotesQuestions } from "./utils/Parser"
import QuestionPage from "./components/QuestionPage";
import StartPage from "./components/StartPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ShowResultsPage from "./components/ShowResultsPage";
import ResultsPage from "./components/ResultsPage";

// Styles
const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  color: #fff;
`;
const Container = styled.div.attrs({ className: "container"})`
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(firebaseAppConf);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, "Questions");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const parsedQuestions = parseQuestions(dataItem);
          setQuestions(parsedQuestions);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(firebaseAppConf);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, "Votes");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const parsedQuestions = parseVotesQuestions(dataItem);
          console.log();
          setResults(parsedQuestions);
        }
      });
    };

    // Fetch data when the component mounts
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
            <Route path="/" element={<StartPage></StartPage>}></Route>
            <Route path="/results" element={<ShowResultsPage></ShowResultsPage>}></Route>
            <Route path="/chart" element={<ResultsPage votesQuestions= {results}></ResultsPage>}></Route>
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
