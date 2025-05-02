import React, { useState, useEffect } from "react";
import { Form } from "antd";
import JobForm from "./JobForm";
import { RetrieveLocalStorage, UpdateLocalStorage } from "../utils/jobStorage";
import dayjs from "dayjs";
import { CustomModal } from "../styles/FormStyles";
import CustomButton from "./CustomButton";

const EditJobModal = ({ open, setOpen, refreshJobData, selectedEditData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedEditData) {
      form.setFieldsValue({
        ...selectedEditData,
        date: selectedEditData.date
          ? dayjs(selectedEditData.date, "M/DD/YYYY")
          : null,
      });
    }
  }, [selectedEditData, form]);

  const onFinish = (values) => {
    setConfirmLoading(true);

    const existingJobs = RetrieveLocalStorage();

    const updatedJobs = existingJobs.map((job) => {
      if (job.key === selectedEditData.key) {
        return {
          ...job,
          ...values,
          date: values.date ? values.date.format("M/DD/YYYY") : null,
        };
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
            text="edit job"
            loading={confirmLoading}
          />,
        ]}
      >
        <JobForm form={form} onFinish={onFinish} />
      </CustomModal>
    </>
  );
};
export default EditJobModal;
