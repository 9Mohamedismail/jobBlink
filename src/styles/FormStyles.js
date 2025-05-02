import styled from "styled-components";
import { Form, Modal } from "antd";

export const StyledForm = styled(Form)`
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

export const StyledModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-header,
  .ant-modal-footer {
    background-color: black;
    color: #e1e1e1;
  }
`;
