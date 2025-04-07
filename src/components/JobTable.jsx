import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Empty,
  Table,
  Form,
  Input,
  ConfigProvider,
  Popconfirm,
  theme,
} from "antd";
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

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current && inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (error) {
      console.log("Save failed:", error);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function JobTable() {
  const handleSave = (row) => {
    const newData = [...jobData];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setJobData(newData);
    UpdateLocalStorage(newData);
  };

  const columns = [
    {
      title: "company",
      dataIndex: "company",
      key: "company",
      editable: true,
    },
    {
      title: "position",
      dataIndex: "position",
      key: "position",
      editable: true,
    },
    {
      title: "job Description Link",
      dataIndex: "url",
      key: "url",
      editable: true,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      editable: true,
    },
    {
      title: "job Type",
      dataIndex: "jobType",
      key: "jobType",
      editable: true,
    },
    {
      title: "apply date",
      dataIndex: "date",
      key: "date",
      editable: true,
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

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
              <CustomButton text="add job" onClick={() => showModal()} />
              <CustomButton text="edit checked" />
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
              components={{
                body: {
                  row: EditableRow,
                  cell: EditableCell,
                },
              }}
              rowSelection={{ type: "checkbox", ...rowSelection }}
              columns={mergedColumns}
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
