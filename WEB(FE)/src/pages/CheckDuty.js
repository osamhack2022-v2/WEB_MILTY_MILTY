import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Tag, Button, PageHeader } from "antd";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const color = (name) => {
  switch (name) {
    case "CCTV":
      return "green";
    case "무기고":
      return "gold";
    case "불침번":
      return "geekblue";
    case "위병소":
      return "purple";
    case "당직":
      return "magenta";
    default:
      return "default";
  }
};

const CheckDuty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);

  const fetchUserDutySchedule = useCallback(() => {
    axios
      .post("/api/user/get-duty-schedule", {
        user_pid: user.user_pid,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setSchedule(response.data.schedule);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchUserDutySchedule();
  }, []);

  const dateCellRender = useCallback(
    (date) => (
      <div>
        {schedule
          .filter((item) => date.isSame(item.date, "day"))
          .map((item) => (
            <Button type="text" key={item.pid} style={{ padding: "0" }}>
              <Tag color={color(item.duty_name)}>{item.duty_name}</Tag>
              <span>
                {item.start_time}-{item.end_time}
              </span>
            </Button>
          ))}
      </div>
    ),
    [schedule]
  );

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{ backgroundColor: "#ECEBE2" }}
          onBack={() => null}
          title="근무 확인"
        />
        <CustomCalendar
          onSelect={(date) => navigate(date.format("YYYY-MM-DD"))}
          dateCellRender={dateCellRender}
        />
      </Content>
    </Layout>
  );
};

export default CheckDuty;
