import React, { useState } from "react";
import { Form } from "antd";
import { Modal } from "antd";
import AddJobForm from "./AddJobForm";
import { RetrieveLocalStorage, AddLocalStorage } from "../utils/jobStorage";
import styled from "styled-components";

const CustomModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-title {
    background-color: #101010;
    color: #e1e1e1;
  }
`;

const AddJobModal = ({ open, setOpen, refreshJobData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    AddLocalStorage({ ...values, key: RetrieveLocalStorage().length });
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
        title="add job"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <AddJobForm form={form} onFinish={onFinish} />
      </CustomModal>
    </>
  );
};
export default AddJobModal;
