import { React, useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { AddLocalStorage } from "../utils/jobStorage";

const sharedStyles = css`
  border-radius: 11px;
  border: solid #383838;
  padding: 10px;
  background-color: transparent;
  font-weight: 500;
  font-size: 14px;
  color: #e1e1e1;
`;

const Wrapper = styled.div`
  display: flex;
  width: 37%;
`;

const InputField = styled.input`
  height: 18px;
  margin: 0;
  flex: 1;
  ${sharedStyles}
`;

const Button = styled.button`
  width: 72px;
  margin-left: 10px;
  ${sharedStyles}
`;

function InputBar() {
  const [inputUrl, setInputUrl] = useState("");

  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleClick = () => {
    const encodedUrl = encodeURIComponent(inputUrl);
    axios
      .get(`http://localhost:5000/api/job?url=${encodedUrl}`)
      .then((res) => {
        console.log("AXIOS RES", res.data);
        setInputUrl("");
        AddLocalStorage(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(inputUrl);
  return (
    <Wrapper>
      <InputField
        type="text"
        placeholder="paste job link here"
        value={inputUrl}
        onChange={handleChange}
      />
      <Button onClick={handleClick}> submit </Button>
    </Wrapper>
  );
}

export default InputBar;
