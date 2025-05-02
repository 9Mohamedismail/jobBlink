import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { StyledForm } from "../styles/FormStyles";

function JobForm({ form, onFinish }) {
  const { Option } = Select;
  return (
    <StyledForm
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
    </StyledForm>
  );
}

export default JobForm;
