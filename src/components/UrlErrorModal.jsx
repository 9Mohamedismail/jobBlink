import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import CustomButton from "./CustomButton";

const StyledErrorModal = styled(Modal)`
  .ant-modal-content {
    color: #e1e1e1;
    text-align: center;
    background-color: black;
    width: auto;
    margin-left: 10px;
    border-radius: 11px;
    border: solid #383838;
    padding: 10px;
  }
  .ant-modal-footer {
    text-align: center;
  }
  p {
    font-size: 16px !important;
  }
`;

const getErrorMessage = (urlErrorType) => {
  if (urlErrorType === "INVALID_URL") {
    return "looks like i don’t recognize this link, it might be invalid or that service isn't supported yet. mind checking it and trying again?";
  }

  return `looks like you used a ${urlErrorType.toLowerCase()} link but something went wrong. it might be invalid or the job’s no longer available. mind checking it or grabbing a different link?`;
};

const UrlErrorModal = ({ open, onClose, urlErrorType }) => {
  return (
    <StyledErrorModal
      closable={false}
      open={open}
      onCancel={onClose}
      centered
      footer={[<CustomButton key="cancel" onClick={onClose} text="okay" />]}
    >
      <p>{getErrorMessage(urlErrorType)}</p>
    </StyledErrorModal>
  );
};

export default UrlErrorModal;
