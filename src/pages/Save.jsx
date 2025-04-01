import InputBar from "../components/InputBar";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import logo from "../assets/Logo.png";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 20%;
`;

function Save() {
  return (
    <Container>
      <NavBar />
      <Content>
        <Logo src={logo} />
        <InputBar />
      </Content>
    </Container>
  );
}

export default Save;
