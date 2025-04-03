import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: auto;
  margin-left: 10px;
  border-radius: 11px;
  border: solid #383838;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => (props.$danger ? "red" : "#e1e1e1")};
`;

const CustomButton = React.forwardRef(
  ({ text, onClick = () => {}, danger = false }, ref) => {
    return (
      <Button ref={ref} $danger={danger} onClick={onClick}>
        {text}
      </Button>
    );
  }
);

export default CustomButton;
