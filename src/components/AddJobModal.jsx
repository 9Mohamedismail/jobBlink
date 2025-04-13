import React, { useState } from "react";
import { Form } from "antd";
import { Modal } from "antd";
import AddJobForm from "./AddJobForm";
import { RetrieveLocalStorage, AddLocalStorage } from "../utils/jobStorage";
import styled from "styled-components";
import CustomButton from "./CustomButton";

const CustomModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-header,
  .ant-modal-footer {
    background-color: black;
    color: #e1e1e1;
  }
`;

const AddJobModal = ({ open, setOpen, refreshJobData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    AddLocalStorage({
      ...values,
      date: values.date ? values.date.format("M/DD/YYYY") : null,
      key: RetrieveLocalStorage().length,
    });
    setConfirmLoading(true);
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
            text="add job"
            loading={confirmLoading}
          />,
        ]}
      >
        <AddJobForm form={form} onFinish={onFinish} />
      </CustomModal>
    </>
  );
};
export default AddJobModal;
