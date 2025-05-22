import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: #e1e1e1;
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: 700px;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
`;

const Credit = styled.blockquote`
  font-style: italic;
  margin-top: 2rem;
  border-left: 3px solid #888;
  padding-left: 1rem;
  color: #aaa;
`;

function About() {
  return (
    <Container>
      <Content>
        <Title>About JobBlink</Title>
        <Paragraph>
          JobBlink was born out of frustration. After spending hours applying to
          jobs, I found myself wasting even more time copying and pasting each
          job&rsquo;s title, company, location, and more into an Excel sheet —
          over and over again. It was tedious, inefficient, and took the joy out
          of staying organized.
        </Paragraph>
        <Paragraph>That’s when I decided to build a better way.</Paragraph>
        <Paragraph>
          JobBlink is a smart job tracking tool that makes it incredibly easy to
          save and manage job applications. Instead of manually entering job
          info, you simply paste the link to a job posting from platforms like
          Greenhouse, Workday, Lever, or Ashby — and JobBlink does the rest. It
          automatically pulls in all relevant details and adds the job to your
          personalized table.
        </Paragraph>
        <Paragraph>
          From there, you can:
          <ul>
            <li>Edit job details directly in the table</li>
            <li>
              Tag jobs with custom statuses like “applied,” “interviewing,”
              “rejected,” or “offer”
            </li>
            <li>
              Manually add jobs if you want to use JobBlink like a traditional
              tracker
            </li>
            <li>Export to CSV for record-keeping</li>
          </ul>
        </Paragraph>
        <Paragraph>
          All your data is saved automatically in your browser — no account or
          login required. Your job tracking stays local, private, and instantly
          accessible. Plus, everything is open source — check out the code on{" "}
          <a
            href="https://github.com/9Mohamedismail/jobBlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </Paragraph>

        <Credit>
          UI inspired by{" "}
          <a
            href="https://cobalt.tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cobalt
          </a>{" "}
          — full credit to their clean and minimal design approach, which
          greatly influenced this project. While the design is inspired, the
          codebase, functionality, and features are entirely original and
          tailored to solve a different problem — job application tracking.
        </Credit>
      </Content>
    </Container>
  );
}

export default About;
