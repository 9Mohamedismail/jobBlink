import { React, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AddLocalStorage, RetrieveLocalStorage } from "../utils/jobStorage";
import CustomButton from "./CustomButton";
import { FaPaste } from "react-icons/fa";
import { handleLeverURL } from "../utils/handleLeverURL";
import { handleURL } from "../utils/handleURL";
import JobErrorModal from "./JobUrlErrorModal";

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 37%;
`;

const supportJobs = {
  "boards.greenhouse.io": "GREENHOUSE",
  "bah.wd1.myworkdayjobs.com": "WORKDAY",
  "jobs.lever.co": "LEVER",
};

function InputBar({ setVisible }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [urlErrorType, setUrlErrorType] = useState("");

  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleClick = async () => {
    setConfirmLoading(true);
    const formattedDate = new Date().toLocaleDateString();
    const splitURL = inputUrl.split("/");
    const urlType = supportJobs[splitURL[2]] ?? "INVALID_URL";
    let jobData = "";
    try {
      if (urlType === "LEVER") {
        jobData = await handleLeverURL(splitURL[3], splitURL[4]);
        setInputUrl("");
      } else if (urlType !== "INVALID_URL") {
        const encodedUrl = encodeURIComponent(inputUrl);
        jobData = await handleURL(encodedUrl);
        setInputUrl("");
      } else {
        setOpen(true);
        setUrlErrorType(urlType);
        setConfirmLoading(false);
        return;
      }

      console.log(jobData);
      AddLocalStorage({
        ...jobData,
        key: RetrieveLocalStorage().length,
        date: formattedDate,
        url: inputUrl,
      });
      setVisible(true);
      setConfirmLoading(false);
    } catch (error) {
      setOpen(true);
      setUrlErrorType(urlType);
      setConfirmLoading(false);
    }
  };

  const handlePaste = async () => {
    setInputUrl(await navigator.clipboard.readText());
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
        <CustomButton
          onClick={handleClick}
          text="submit"
          loading={confirmLoading}
        />
      </Wrapper>
      <ButtonWrapper>
        <CustomButton
          text="paste "
          icon={<FaPaste size={14} />}
          onClick={handlePaste}
        />
      </ButtonWrapper>
      <JobErrorModal
        open={open}
        setOpen={setOpen}
        urlErrorType={urlErrorType}
        setUrlErrorType={setUrlErrorType}
      />
    </>
  );
}

export default InputBar;
