import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Button = styled.button`
  width: auto;
  margin-left: 10px;
  border-radius: 11px;
  border: solid #383838;
  padding: 10px;
  background-color: transparent;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.$danger ? "#ff4d4f" : "#e1e1e1")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
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
        {loading ? <Spin size="small" /> : text}
        {icon}
      </Button>
    );
  }
);

export default CustomButton;
