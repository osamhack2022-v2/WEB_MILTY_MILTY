import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Table, Row, Col, Typography } from "antd";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const columns = [
  {
    title: "시간",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (_, { start_time, end_time }) => {
      return <span>{start_time} - {end_time}</span>;
    }
  },
  {
    title: "근무자",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
  },
];


const Precept = () => {
  const { user } = useAuth();
  const params = useParams();
  const [duty, setDuty] = useState([]);

  const fetchDaySchedule = useCallback(() => {
    axios
      .post("/api/get-duty-schedule", {
        user_division_code: user.user_division_code,
        date: params.date,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data.result === "success") {
          setDuty(response.data.duty);
          console.log(response.data.duty)
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user])

  useEffect(() => {
    fetchDaySchedule();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ECEBE2",
        padding: "1rem",
      }}
    >
      <Row justify="center" gutter={[16, 16]}>
        {duty.map(({ duty_pid, duty_name, schedule }) => (
          <Col xs={24} xl={11}>
            <Typography.Title level={3}>{duty_name}</Typography.Title>
            <Table
              columns={columns}
              dataSource={schedule}
              pagination={{ position: ["none", "none"] }}
            />
          </Col>
        ))
        }
      </Row>
    </div>
  )
};

export default Precept;
