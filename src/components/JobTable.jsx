import React, { useEffect, useState } from "react";
import { HiLink, HiPencilAlt } from "react-icons/hi";
import { Empty, Table, ConfigProvider, theme } from "antd";
import { useNavigate } from "react-router";
import styled from "styled-components";

import CustomButton from "./CustomButton";
import JobModal from "./JobModal";
import TagUpdateForm from "./TagUpdateForm";
import { RetrieveLocalStorage, UpdateLocalStorage } from "../utils/jobStorage";

import EditableCell from "./EditableCell";
import EditableRow from "./EditableRow";
import getColumns from "./Columns";
import TableButtons from "./TableButtons";

const TableButtonsWrapper = styled.div`
  padding: 24px;
  gap: 10px;
  display: flex;
`;

const EmptyData = styled.div`
  .ant-empty-description {
    color: #e1e1e1;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  gap: 12px;
`;

const TableContainer = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  width: 100%;
  height: 100%;

  .ant-table-cell .row-actions {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }

  .ant-table-cell {
    position: relative;
  }
`;

function JobTable() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setJobData(RetrieveLocalStorage());
    setLoading(false);
  }, []);

  const refreshJobData = () => {
    setJobData(RetrieveLocalStorage());
  };

  const openModal = (modalName, data = null) => {
    setActiveModal(modalName);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const handleDelete = (keys) => {
    const newData = jobData.filter((job) => !keys.includes(job.key));
    setJobData(newData);
    UpdateLocalStorage(newData);
  };

  const handleSave = (row) => {
    const newData = [...jobData];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setJobData(newData);
    UpdateLocalStorage(newData);
  };

  const columns = getColumns({ handleSave, openModal, handleDelete });
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const noneSelected = selectedRowKeys.length === 0;

  return (
    <TableContainer>
      {loading ? (
        <div>Loading...</div>
      ) : jobData.length ? (
        <div>
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <TableButtonsWrapper>
              <TableButtons
                noneSelected={noneSelected}
                jobData={jobData}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                openModal={openModal}
                handleDelete={handleDelete}
              />
            </TableButtonsWrapper>

            <Table
              components={{
                body: {
                  row: EditableRow,
                  cell: EditableCell,
                },
              }}
              rowSelection={{ type: "checkbox", ...rowSelection }}
              columns={columns}
              dataSource={jobData}
              loading={loading}
            />
          </ConfigProvider>
        </div>
      ) : (
        <EmptyData>
          <Empty />
          <TableButtonsWrapper>
            <CustomButton
              text="add via URL"
              onClick={() => navigate("/")}
              icon={<HiLink size={14} />}
            />
            <CustomButton
              text="add manually"
              onClick={() => openModal("add")}
              icon={<HiPencilAlt size={14} />}
            />
          </TableButtonsWrapper>
        </EmptyData>
      )}

      <JobModal
        open={activeModal === "add" || activeModal === "edit"}
        setOpen={closeModal}
        refreshJobData={refreshJobData}
        mode={activeModal === "add" ? "add" : "edit"}
        selectedData={activeModal === "edit" ? modalData : null}
      />

      <TagUpdateForm
        open={activeModal === "editTag"}
        setOpen={closeModal}
        selectedRows={modalData || []}
        refreshJobData={refreshJobData}
      />
    </TableContainer>
  );
}

export default JobTable;
