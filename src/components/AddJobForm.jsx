import { Form, Input, DatePicker } from "antd";
import styled from "styled-components";

const CustomForm = styled(Form)`
  .ant-form-item-label > label {
    color: #e1e1e1;
  }

  /* Dark theme for input fields in ant design form */
  .ant-input,
  .ant-form-item-has-error .ant-input {
    background-color: #101010;
    color: #e1e1e1;
    border-color: #e1e1e1;
  }

  .ant-input:hover,
  .ant-form-item-has-error .ant-input:hover,
  .ant-input:focus,
  .ant-form-item-has-error .ant-input:focus {
    background-color: #101010;
    color: #e1e1e1;
    border-color: #e1e1e1;
  }

  .ant-input::placeholder {
    color: #e1e1e1;
  }

  /* Dark theme for calendar in ant design form */
  .ant-picker,
  .ant-picker-input > input {
    background-color: #101010;
    color: #e1e1e1;
    border-color: #e1e1e1;
  }

  .ant-picker:hover,
  .ant-picker:focus,
  .ant-picker-input > input:hover,
  .ant-picker-input > input:focus {
    background-color: #101010;
    color: #e1e1e1;
    border-color: #e1e1e1;
  }

  .ant-picker-input > input::placeholder {
    color: #e1e1e1;
  }

  .ant-form-item-has-error .ant-picker,
  .ant-form-item-has-error .ant-picker-input > input {
    background-color: #101010;
    color: #e1e1e1;
    border-color: #e1e1e1;
  }

  .ant-form-item-has-error .ant-picker:hover,
  .ant-form-item-has-error .ant-picker:focus,
  .ant-form-item-has-error .ant-picker-input > input:hover,
  .ant-form-item-has-error .ant-picker-input > input:focus {
    background-color: #101010;
    color: #e1e1e1;
    border-color: #e1e1e1;
  }
`;

function AddJobForm({ form, onFinish }) {
  return (
    <CustomForm layout="horizontal" form={form} onFinish={onFinish}>
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
        <Input />
      </Form.Item>
      <Form.Item label="date applied" name="date" rules={[{ required: true }]}>
        <DatePicker format="M-DD-YYYY" placeholder="" />
      </Form.Item>
    </CustomForm>
  );
}

export default AddJobForm;
