import React, { useEffect, useState } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import JobForm from "./JobForm";
import CustomModal from "./CustomModal";
import {
  RetrieveLocalStorage,
  AddLocalStorage,
  UpdateLocalStorage,
} from "../utils/localStorage";

const JobModal = ({
  open,
  setOpen,
  refreshJobData,
  mode = "add",
  selectedData = null,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "edit" && selectedData) {
      form.setFieldsValue({
        ...selectedData,
        date: selectedData.date ? dayjs(selectedData.date, "M/DD/YYYY") : null,
      });
    }
  }, [selectedData, form, mode]);

  const onFinish = (values) => {
    setConfirmLoading(true);

    if (mode === "add") {
      AddLocalStorage({
        ...values,
        date: values.date ? values.date.format("M/DD/YYYY") : null,
        key: RetrieveLocalStorage("jobData").length,
      });
    } else {
      const updated = RetrieveLocalStorage("jobData").map((job) =>
        job.key === selectedData.key
          ? {
              ...job,
              ...values,
              date: values.date ? values.date.format("M/DD/YYYY") : null,
            }
          : job
      );
      UpdateLocalStorage("jobData", updated);
    }

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
      onFinish={onFinish}
      okText={mode === "add" ? "add job" : "edit job"}
    >
      <JobForm form={form} onFinish={onFinish} showTag={mode === "add"} />
    </CustomModal>
  );
};

export default JobModal;
