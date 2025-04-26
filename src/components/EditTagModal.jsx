import React, { useState } from "react";
import { Modal, Form } from "antd";
import CustomButton from "./CustomButton";
import { UpdateLocalStorage, RetrieveLocalStorage } from "../utils/jobStorage";
import EditTagForm from "./EditTagForm";
import styled from "styled-components";

const CustomModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-header,
  .ant-modal-footer {
    background-color: black;
    color: #e1e1e1;
  }
`;

function EditTagModal({ open, setOpen, selectedRows, refreshJobData }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = ({ newTag }) => {
    setConfirmLoading(true);
    const allJobs = RetrieveLocalStorage();

    const updatedJobs = allJobs.map((job) => {
      if (selectedRows.some((selected) => selected.key === job.key)) {
        return { ...job, tag: newTag };
      }
      return job;
    });

    UpdateLocalStorage(updatedJobs);
    setTimeout(() => {
      refreshJobData();
      setOpen(false);
      setConfirmLoading(false);
      form.resetFields();
    }, 2000);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <CustomModal
        title=""
        closable={false}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <CustomButton key="cancel" onClick={handleCancel} text="cancel" />,
          <CustomButton
            key="ok"
            onClick={handleOk}
            text="add tag(s)"
            loading={confirmLoading}
          />,
        ]}
      >
        <EditTagForm
          form={form}
          onFinish={onFinish}
          selectedRows={selectedRows}
        />
      </CustomModal>
    </>
  );
}

export default EditTagModal;
