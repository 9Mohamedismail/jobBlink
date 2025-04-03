import { useState, useEffect } from "react";
import InputBar from "../components/InputBar";
import { Alert } from "antd";
import styled from "styled-components";
import logo from "../assets/Logo.png";

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const AlertWrapper = styled.div`
  overflow: hidden;
  transition: all 0.3s ease;
  max-height: ${(props) => (props.visible ? "60px" : "0")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  margin-bottom: ${(props) => (props.visible ? "16px" : "0")};
`;

const Logo = styled.img`
  width: 20%;
`;

function Add() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Content>
      <AlertWrapper visible={visible}>
        <Alert message="job added" type="success" showIcon />
      </AlertWrapper>
      <Logo src={logo} />
      <InputBar setVisible={setVisible} />
    </Content>
  );
}

export default Add;
