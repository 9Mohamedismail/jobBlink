import React from "react";
import styled from "styled-components";
import SettingsModal from "../components/SettingsModal";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #e1e1e1;
  justify-content: center;
  min-height: 100vh;
`;

function Settings() {
  return (
    <Container>
      <SettingsModal />
    </Container>
  );
}

export default Settings;
