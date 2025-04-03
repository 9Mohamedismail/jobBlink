import InputBar from "../components/InputBar";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import logo from "../assets/Logo.png";

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

function Add() {
  return (
    <Content>
      <Logo src={logo} />
      <InputBar />
    </Content>
  );
}

export default Add;
