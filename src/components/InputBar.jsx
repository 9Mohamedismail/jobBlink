import { React, useState } from "react";
import styled from "styled-components";
import { AddLocalStorage, RetrieveLocalStorage } from "../utils/jobStorage";
import CustomButton from "./CustomButton";
import { FaPaste } from "react-icons/fa";
import { handleLeverURL } from "../utils/handleLeverURL";
import { handleURL } from "../utils/handleURL";
import UrlErrorModal from "./UrlErrorModal";

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

const supportedJobs = {
  "boards.greenhouse.io": "GREENHOUSE",
  "myworkdayjobs.com": "WORKDAY",
  "jobs.lever.co": "LEVER",
  "jobs.ashbyhq.com": "ASHBY",
};

function InputBar({ setVisible }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [urlErrorType, setUrlErrorType] = useState(null);

  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleClick = async () => {
    setConfirmLoading(true);
    const formattedDate = new Date().toLocaleDateString();
    let urlType = "INVALID_URL";

    try {
      const urlObj = new URL(inputUrl);
      const host = urlObj.host;

      for (const domain in supportedJobs) {
        if (host.includes(domain)) {
          urlType = supportedJobs[domain];
          break;
        }
      }

      if (urlType === "INVALID_URL") {
        setUrlErrorType(urlType);
        setConfirmLoading(false);
        return;
      }

      let jobData = "";
      if (urlType === "LEVER") {
        const splitURL = inputUrl.split("/");
        jobData = await handleLeverURL(splitURL[3], splitURL[4]);
      } else {
        const encodedUrl = encodeURIComponent(inputUrl);
        jobData = await handleURL(encodedUrl);
      }

      AddLocalStorage({
        ...jobData,
        key: RetrieveLocalStorage().length,
        date: formattedDate,
        url: inputUrl,
      });
      setVisible(true);
      setInputUrl("");
    } catch (error) {
      console.error(error);
      setUrlErrorType(urlType);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handlePaste = async () => {
    setInputUrl(await navigator.clipboard.readText());
  };

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
          disabled={!inputUrl.trim()}
        />
      </Wrapper>
      <ButtonWrapper>
        <CustomButton
          text="paste "
          icon={<FaPaste size={14} />}
          onClick={handlePaste}
        />
      </ButtonWrapper>

      {urlErrorType && (
        <UrlErrorModal
          open={!!urlErrorType}
          onClose={() => setUrlErrorType(null)}
          urlErrorType={urlErrorType}
        />
      )}
    </>
  );
}

export default InputBar;
