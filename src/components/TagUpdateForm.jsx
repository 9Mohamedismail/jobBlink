import React, { useState } from "react";
import { Form } from "antd";
import CustomModal from "./CustomModal";
import TagEditForm from "./TagEditForm";
import {
  UpdateLocalStorage,
  RetrieveLocalStorage,
} from "../utils/localStorage";

function TagUpdateForm({ open, setOpen, selectedRows, refreshJobData }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = ({ newTag }) => {
    setConfirmLoading(true);
    const allJobs = RetrieveLocalStorage("jobData");

    const updatedJobs = allJobs.map((job) =>
      selectedRows.some((selected) => selected.key === job.key)
        ? { ...job, tag: newTag }
        : job,
    );

    UpdateLocalStorage("jobData", updatedJobs);

    setTimeout(() => {
      refreshJobData();
      setOpen(false);
      setConfirmLoading(false);
      form.resetFields();
    }, 2000);
  };

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      confirmLoading={confirmLoading}
      form={form}
      okText="add tag(s)"
    >
      <TagEditForm
        form={form}
        onFinish={onFinish}
        selectedRows={selectedRows}
      />
    </CustomModal>
  );
}

export default TagUpdateForm;
