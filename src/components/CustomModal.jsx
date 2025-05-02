import React from "react";
import { StyledModal } from "../styles/FormStyles";
import CustomButton from "./CustomButton";

const CustomModal = ({
  open,
  setOpen,
  confirmLoading,
  form,
  okText = "submit",
  children,
}) => {
  const handleOk = () => form.submit();
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <StyledModal
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
          text={okText}
          loading={confirmLoading}
        />,
      ]}
    >
      {children}
    </StyledModal>
  );
};

export default CustomModal;
