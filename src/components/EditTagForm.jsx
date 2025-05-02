import React from "react";
import { Form, Select } from "antd";
import { CustomForm } from "../styles/FormStyles";

function EditTagForm({ form, onFinish, selectedRows }) {
  const { Option } = Select;
  return (
    <CustomForm
      layout="vertical"
      form={form}
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        name="newTag"
        label={`Change tag for ${selectedRows.length} job(s) to:`}
        rules={[{ required: true, message: "Please select a tag." }]}
      >
        <Select placeholder="Select tag">
          <Option value="applied">Applied</Option>
          <Option value="interviewing">Interviewing</Option>
          <Option value="offer">Offer</Option>
          <Option value="rejected">Rejected</Option>
          <Option value="followup">Follow Up</Option>
        </Select>
      </Form.Item>
    </CustomForm>
  );
}

export default EditTagForm;
