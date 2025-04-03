import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Add from "./pages/Add";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Settings from "./pages/Settings";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<Add />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Container>
  );
}

export default App;
