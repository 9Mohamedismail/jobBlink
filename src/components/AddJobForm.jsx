import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import styled from "styled-components";

const CustomForm = styled(Form)`
  .ant-form-item-label > label {
    color: #e1e1e1;
  }

  .ant-input,
  .ant-select,
  .ant-select-selector {
    background-color: black !important;
    color: #e1e1e1 !important;
    border-color: #383838 !important;
  }

  .ant-input:hover,
  .ant-input:focus,
  .ant-select-selector:hover,
  .ant-select-selector:focus {
    background-color: black !important;
    color: #e1e1e1 !important;
    border-color: #e1e1e1 !important;
  }

  .ant-form-item-has-error .ant-input {
    border-color: #ff4d4f !important;
  }
`;
function AddJobForm({ form, onFinish }) {
  const { Option } = Select;
  return (
    <CustomForm
      layout="horizontal"
      form={form}
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item label="company" name="company" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="position" name="position" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="job description link"
        name="url"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="location" name="location" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="job type" name="jobType" rules={[{ required: true }]}>
        <Select>
          <Option value="FULL TIME">full-time</Option>
          <Option value="PART TIME">part-time</Option>
          <Option value="CONTRACT">contract</Option>
          <Option value="INTERNSHIP">internship</Option>
          <Option value="TEMPORARY">temporary</Option>
          <Option value="FREELANCE">freelance</Option>
        </Select>
      </Form.Item>
      <Form.Item label="tag" name="tag" rules={[{ required: true }]}>
        <Select>
          <Option value="applied">applied</Option>
          <Option value="interviewing">interviewing</Option>
          <Option value="offer">offer</Option>
          <Option value="rejected">rejected</Option>
          <Option value="followup">follow Up</Option>
        </Select>
      </Form.Item>
      <Form.Item label="date applied" name="date" rules={[{ required: true }]}>
        <DatePicker format="M-DD-YYYY" placeholder="" />
      </Form.Item>
    </CustomForm>
  );
}

export default AddJobForm;
