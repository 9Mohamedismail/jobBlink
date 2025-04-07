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

const JobUrlErrorModal = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
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
          looks like you inputted a ___ link. that service is supported but the
          link is returning an error. mind checking it and trying again?
        </p>
      </KnownUrlModal>

      <JobDeletedModal
        closable={false}
        open={open}
        onCancel={handleCancel}
        centered
        footer={[
          <CustomButton key="cancel" onClick={handleCancel} text="okay" />,
        ]}
      >
        <p>
          looks like this ___ job isn’t available anymore grab a different link
          to track.
        </p>
      </JobDeletedModal>
    </div>
  );
};
export default JobUrlErrorModal;
