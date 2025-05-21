import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Button = styled.button`
  width: auto;
  margin-left: 10px;
  border-radius: 11px;
  border: solid #818181;
  padding: 10px;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.$danger ? "#ff4d4f" : "#e1e1e1")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s ease;

  &:hover {
    ${(props) =>
      !props.disabled &&
      `
      border-color: #e1e1e1;
      color: ${props.$danger ? "#ff7875" : "#ffffff"};
    `}
  }
`;

const CustomButton = React.forwardRef(
  (
    { text, onClick = () => {}, danger = false, icon, loading, disabled },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        $danger={danger}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading && <Spin size="small" />}
        {!loading && text}
        {icon}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";
export default CustomButton;
