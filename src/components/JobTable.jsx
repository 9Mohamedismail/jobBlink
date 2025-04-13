import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Empty,
  Table,
  Form,
  Input,
  ConfigProvider,
  Popconfirm,
  theme,
  Tag,
} from "antd";
import CustomButton from "./CustomButton";
import { RetrieveLocalStorage, UpdateLocalStorage } from "../utils/jobStorage";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AddJobModal from "./AddJobModal";
import EditJobModal from "./EditJobModal";

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

const TableContainer = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  width: 100%;
  height: 100%;
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
      inputRef.current?.focus();
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

const tagColors = {
  applied: "blue",
  interviewing: "gold",
  offer: "green",
  rejected: "red",
  followup: "orange",
};

function JobTable() {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setJobData(RetrieveLocalStorage());
    setLoading(false);
  }, []);

  const refreshJobData = () => {
    setJobData(RetrieveLocalStorage());
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

  const columns = [
    { title: "company", dataIndex: "company", key: "company", editable: true },
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
    { title: "job Type", dataIndex: "jobType", key: "jobType", editable: true },
    { title: "apply date", dataIndex: "date", key: "date", editable: true },
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
    {
      title: "Tag",
      key: "tag",
      dataIndex: "tag",
      editable: true,
      render: (tag) => {
        const normalizedTag = tag?.toLowerCase();
        const color = tagColors[normalizedTag];
        return (
          <Tag color={color} key={normalizedTag}>
            {normalizedTag}
          </Tag>
        );
      },
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

  const rowSelection = {
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <TableContainer>
      {loading ? (
        <div>Loading...</div>
      ) : jobData.length ? (
        <div>
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <TableButtons>
              <CustomButton
                text="add job"
                onClick={() => setOpenAddModal(true)}
              />

              {selectedRowKeys.length > 0 && (
                <>
                  {selectedRowKeys.length === 1 && (
                    <CustomButton
                      text="edit checked"
                      onClick={() => {
                        const selectedData = jobData.find((item) =>
                          selectedRowKeys.includes(item.key)
                        );
                        setSelectedEditData(selectedData);
                        setOpenEditModal(true);
                      }}
                    />
                  )}

                  <Popconfirm
                    title="are you sure?"
                    placement="bottom"
                    okText="yes"
                    cancelText="cancel"
                    onConfirm={() => handleDelete(selectedRowKeys)}
                  >
                    <CustomButton text="delete checked" />
                  </Popconfirm>
                </>
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
              loading={loading}
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
        open={openAddModal}
        setOpen={setOpenAddModal}
        refreshJobData={refreshJobData}
      />
      <EditJobModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        selectedEditData={selectedEditData}
        refreshJobData={refreshJobData}
      />
    </TableContainer>
  );
}

export default JobTable;
