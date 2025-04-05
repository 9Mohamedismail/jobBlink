import { useEffect, useState } from "react";
import { Empty, Table, ConfigProvider, Popconfirm, theme } from "antd";
import CustomButton from "./CustomButton";
import { RetrieveLocalStorage, UpdateLocalStorage } from "../utils/jobStorage";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AddJobModal from "./AddJobModal";

const TableButtons = styled.div`
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

const Container = styled.div`
  width: 100%;
`;

function JobTable() {
  const columns = [
    {
      title: "company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "job Description Link",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "job Type",
      dataIndex: "jobType",
      key: "jobType",
    },
    {
      title: "apply date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_, record) =>
        jobData.length >= 1 ? (
          <Popconfirm
            title="are you sure?"
            placement="left"
            okText="yes"
            cancelText="cancel"
            onConfirm={() => handleDelete([record.key])}
          >
            <CustomButton text="delete" danger />
          </Popconfirm>
        ) : null,
    },
  ];

  const navigate = useNavigate();

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setJobData(RetrieveLocalStorage());
  }, []);

  const refreshJobData = () => {
    setJobData(RetrieveLocalStorage());
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleDelete = (key) => {
    console.log(key);
    const newData = jobData.filter((job) => !key.includes(job.key));
    setJobData(newData);
    UpdateLocalStorage(newData);
  };

  console.log(jobData.length);
  console.log(selectedRowKeys);

  return (
    <div>
      {jobData.length ? (
        <div>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <TableButtons>
              <CustomButton text="add" onClick={() => showModal()} />
              <CustomButton text="edit" />
              {selectedRowKeys.length && (
                <Popconfirm
                  title="are you sure?"
                  placement="bottom"
                  okText="yes"
                  cancelText="cancel"
                  onConfirm={() => handleDelete(selectedRowKeys)}
                >
                  <CustomButton text="delete checked" />
                </Popconfirm>
              )}
            </TableButtons>
            <Table
              rowSelection={{ type: "checkbox", ...rowSelection }}
              columns={columns}
              dataSource={jobData}
            />
          </ConfigProvider>
        </div>
      ) : (
        <EmptyData>
          <Empty />
          <CustomButton text="add first job" onClick={() => navigate("/")} />
        </EmptyData>
      )}
      <AddJobModal
        open={open}
        setOpen={setOpen}
        refreshJobData={refreshJobData}
      />
    </div>
  );
}

export default JobTable;
