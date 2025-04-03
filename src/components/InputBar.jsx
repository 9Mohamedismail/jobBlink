import { React, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AddLocalStorage, RetrieveLocalStorage } from "../utils/jobStorage";
import CustomButton from "./CustomButton";

const Wrapper = styled.div`
  display: flex;
  width: 37%;
`;

const InputField = styled.input`
  height: 18px;
  margin: 0;
  flex: 1;
  border-radius: 11px;
  border: solid #383838;
  padding: 10px;
  background-color: transparent;
  color: #e1e1e1;
`;

function InputBar({ setVisible }) {
  const [inputUrl, setInputUrl] = useState("");

  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleClick = () => {
    const formattedDate = new Date().toLocaleDateString();
    const encodedUrl = encodeURIComponent(inputUrl);
    axios
      .get(`http://localhost:5000/api/job?url=${encodedUrl}`)
      .then(({ data }) => {
        console.log("AXIOS RES", data);
        setInputUrl("");
        AddLocalStorage({
          ...data,
          key: RetrieveLocalStorage().length,
          date: formattedDate,
          url: inputUrl,
        });
        setVisible(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(inputUrl);
  return (
    <>
      <Wrapper>
        <InputField
          type="text"
          placeholder="paste job link here"
          value={inputUrl}
          onChange={handleChange}
        />
        <CustomButton onClick={handleClick} text="submit" />
      </Wrapper>
    </>
  );
}

export default InputBar;
