import { useEffect, useState } from "react";
import { Table } from "antd";
import { RetrieveLocalStorage } from "../utils/jobStorage";

const columns = [
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Job Description Link",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Job Type",
    dataIndex: "jobType",
    key: "jobType",
  },
  {
    title: "When did you apply?",
    dataIndex: "date",
    key: "date",
  },
];

function JobTable() {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    setJobData(RetrieveLocalStorage());
  }, []);

  console.log(jobData);

  return <Table columns={columns} dataSource={jobData} />;
}

export default JobTable;
