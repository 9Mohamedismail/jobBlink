import React from "react";
import JobTable from "../components/JobTable";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Jobs() {
  return (
    <Container>
      <JobTable />;
    </Container>
  );
}

export default Jobs;
