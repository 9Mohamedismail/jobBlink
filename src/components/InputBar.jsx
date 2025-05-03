import { React, useState } from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton";
import { FaPaste } from "react-icons/fa";
import UrlErrorModal from "./UrlErrorModal";
import { parseAndSaveJob } from "../utils/parseAndSaveJob";

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

function InputBar({ setVisible }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [urlErrorType, setUrlErrorType] = useState(null);

  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleClick = async () => {
    await parseAndSaveJob(
      inputUrl,
      setUrlErrorType,
      setConfirmLoading,
      setVisible,
      setInputUrl,
    );
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
