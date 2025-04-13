import { Form, Select } from "antd";
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
function EditTagForm({ form, onFinish, selectedRows }) {
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
