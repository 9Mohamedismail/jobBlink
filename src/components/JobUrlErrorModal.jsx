import React, { useState } from "react";
import { Modal } from "antd";
import styled, { css } from "styled-components";
import CustomButton from "./CustomButton";

const sharedStyle = css`
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

const InvalidUrlModal = styled(Modal)`
  ${sharedStyle}
`;
const KnownUrlModal = styled(Modal)`
  ${sharedStyle}
`;
const JobDeletedModal = styled(Modal)`
  ${sharedStyle}
`;

const JobUrlErrorModal = ({ open, setOpen, urlErrorType, setUrlErrorType }) => {
  const handleCancel = () => {
    setOpen(false);
    setUrlErrorType("");
  };

  return (
    <div>
      {urlErrorType === "INVALID_URL" && (
        <InvalidUrlModal
          closable={false}
          open={open}
          onCancel={handleCancel}
          centered
          footer={[
            <CustomButton key="cancel" onClick={handleCancel} text="okay" />,
          ]}
        >
          <p>
            looks like i don’t recognize this link, it might be invalid or that
            service isn't supported yet. mind checking it and trying again?
          </p>
        </InvalidUrlModal>
      )}

      {urlErrorType !== "KNOWN_URL" && (
        <KnownUrlModal
          closable={false}
          open={open}
          onCancel={handleCancel}
          centered
          footer={[
            <CustomButton key="cancel" onClick={handleCancel} text="okay" />,
          ]}
        >
          <p>
            looks like you used a {urlErrorType} link. that service is supported
            but something went wrong with the link. it might be invalid or the
            job’s no longer available. mind checking it or grabbing a different
            link?
          </p>
        </KnownUrlModal>
      )}
    </div>
  );
};
export default JobUrlErrorModal;
