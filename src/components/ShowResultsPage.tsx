import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setActiveQuestion } from "../utils/FirebaseSetter";

// Style
const Container = styled.div`
  text-align: center;
`;

const Button = styled.button.attrs({ className: "showResultsButton" })``;

// Component
export default function ShowResultsPage() {
  useEffect(() => {
    setActiveQuestion("");
  }, []);

  const navigate = useNavigate();
  function showResults() {
    navigate("/chart");
  }

  return (
    <Container>
      <h1>THE QUIZ IS NOW COMPLETE!</h1>
      <Button onClick={showResults}>SHOW RESULTS</Button>
    </Container>
  );
}
