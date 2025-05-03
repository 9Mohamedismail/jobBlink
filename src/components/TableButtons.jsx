import React from "react";
import CustomButton from "./CustomButton";
import { Popconfirm } from "antd";

const TableButtons = ({
  noneSelected,
  jobData,
  selectedRowKeys,
  setSelectedRowKeys,
  openModal,
  handleDelete,
}) => {
  return (
    <>
      <CustomButton
        text={noneSelected ? "select all" : "deselect all"}
        onClick={() => {
          if (noneSelected) {
            setSelectedRowKeys(jobData.map((job) => job.key));
          } else {
            setSelectedRowKeys([]);
          }
        }}
        disabled={jobData.length === 0}
      />

      <CustomButton text="add job" onClick={() => openModal("add")} />

      <CustomButton
        text="edit job"
        onClick={() => {
          const selectedData = jobData.find((item) =>
            selectedRowKeys.includes(item.key),
          );
          openModal("edit", selectedData);
        }}
        disabled={selectedRowKeys.length !== 1}
      />

      <Popconfirm
        title="are you sure?"
        placement="bottom"
        okText="yes"
        cancelText="cancel"
        onConfirm={() => handleDelete(selectedRowKeys)}
      >
        <CustomButton
          text="delete checked"
          disabled={selectedRowKeys.length === 0}
        />
      </Popconfirm>

      <CustomButton
        text="change tag(s)"
        onClick={() => {
          const selectedData = jobData.filter((item) =>
            selectedRowKeys.includes(item.key),
          );
          openModal("editTag", selectedData);
        }}
        disabled={selectedRowKeys.length === 0}
      />
    </>
  );
};

export default TableButtons;
