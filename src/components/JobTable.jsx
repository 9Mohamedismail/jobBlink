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
  Dropdown,
} from "antd";
import CustomButton from "./CustomButton";
import { RetrieveLocalStorage, UpdateLocalStorage } from "../utils/jobStorage";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AddJobModal from "./AddJobModal";
import EditJobModal from "./EditJobModal";
import EditTagModal from "./EditTagModal";
import { MoreOutlined } from "@ant-design/icons";

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

const EditableContext = React.createContext(null);

const EditableRow = ({ ...props }) => {
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
      title: "Tag",
      key: "tag",
      dataIndex: "tag",
      editable: true,
      render: (tag) => {
        const normalizedTag = tag?.toLowerCase();
        const color = tagColors[normalizedTag];
        return (
          <Tag color={color} key={normalizedTag}>
            {tag}
          </Tag>
        );
      },
    },
    {
      dataIndex: "action",
      width: 50, // keep it tight
      render: (_, record) => {
        const menuItems = [
          {
            key: "edit",
            label: "Edit",
            onClick: () => openModal("edit", record),
          },
          {
            key: "delete",
            label: "Delete",
            danger: true,
            onClick: () => handleDelete([record.key]),
          },
        ];

        return (
          <div className="row-actions">
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            </Dropdown>
          </div>
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
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const noneSelected = selectedRowKeys.length === 0;

  return (
    <TableContainer>
      {loading ? (
        <div>Loading...</div>
      ) : jobData.length ? (
        <div>
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <TableButtons>
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

      {/* Modals */}
      <AddJobModal
        open={activeModal === "add"}
        setOpen={closeModal}
        refreshJobData={refreshJobData}
      />
      <EditJobModal
        open={activeModal === "edit"}
        setOpen={closeModal}
        selectedEditData={modalData}
        refreshJobData={refreshJobData}
      />
      <EditTagModal
        open={activeModal === "editTag"}
        setOpen={closeModal}
        selectedRows={modalData || []}
        refreshJobData={refreshJobData}
      />
    </TableContainer>
  );
}

export default JobTable;
