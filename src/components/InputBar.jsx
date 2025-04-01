import styled from "styled-components";

function InputBar() {
  const InputBar = styled.input`
    border-radius: 11px;
    height: 18px;
    font-weight: 500;
    margin: 0;
    padding: 10px;
    border: solid #383838;
    width: 37%;
    color: #e1e1e1;
    background-color: transparent;
    font-size: 14px;
  `;
  return <InputBar placeholder="paste job link here" />;
}

export default InputBar;
