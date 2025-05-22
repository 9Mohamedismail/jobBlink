import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, Radio } from "antd";
import CustomButton from "./CustomButton";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import {
  RetrieveLocalStorage,
  UpdateLocalStorage,
} from "../utils/localStorage";
import { handleExport } from "../utils/exportToCSV";
import { Popconfirm, ConfigProvider, theme } from "antd";

const StyledModal = styled.div`
  border-radius: 11px;
  border: solid #818181;
  padding: 50px;
  background-color: transparent;
  color: #e1e1e1;
  margin: auto;
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 64px;

  .ant-radio-wrapper {
    color: #e1e1e1 !important;
  }
`;

function SettingsModal() {
  const [jobData, setJobData] = useState([]);
  const [settingsData, setSettingsData] = useState({});

  useEffect(() => {
    setSettingsData(RetrieveLocalStorage("settingsData"));
    const storedJobs = RetrieveLocalStorage("jobData");
    setJobData(storedJobs);
  }, []);

  const updateSettings = (key, value) => {
    const updated = { ...settingsData, [key]: value };
    setSettingsData(updated);
    UpdateLocalStorage("settingsData", updated);
  };

  return (
    <StyledModal>
      <Row>
        <p>show rejected jobs</p>
        <Switch
          checked={settingsData.showRejectedJobs}
          onChange={(checked) => updateSettings("showRejectedJobs", checked)}
        />
      </Row>

      <Row>
        <p>sort job dates on default by:</p>
        <Radio.Group
          onChange={(e) => updateSettings("sortJobsBy", e.target.value)}
          value={settingsData.sortJobsBy}
        >
          <Radio value={"ascend"}>Ascending</Radio>
          <Radio value={"descend"}>Descending</Radio>
        </Radio.Group>
      </Row>

      <Row>
        <p>export all jobs to CSV</p>
        <CustomButton
          text="export"
          icon={<FiDownload size={14} />}
          onClick={() => handleExport(jobData)}
          disabled={jobData.length === 0}
        />
      </Row>

      <Row>
        <p>clear all data</p>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <Popconfirm
            title="are you sure?"
            placement="bottom"
            okText="yes"
            cancelText="cancel"
            onConfirm={() => UpdateLocalStorage("jobData", [])}
          >
            <CustomButton text="clear" icon={<FiTrash2 size={14} />} danger />
          </Popconfirm>
        </ConfigProvider>
      </Row>
    </StyledModal>
  );
}

export default SettingsModal;
