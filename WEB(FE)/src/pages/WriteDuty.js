import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, PageHeader } from "antd";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const WriteDuty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);

  const fetchDutySchedule = useCallback(() => {
    axios
      .post("/api/check-duty-schedule", {
        division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setSchedule(response.data.date);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  const setDutySchedule = useCallback(
    (date) => {
      axios
        .post("/api/set-duty-schedule", {
          user_division_code: user.user_division_code,
          date,
        })
        .then((response) => {
          if (response.status === 200 && response.data.result === "success") {
            alert("경작서 생성이 완료되었습니다!");
            fetchDutySchedule();
          } else if (
            response.status === 200 &&
            response.data.result === "fail"
          ) {
            alert("경작서 생성에 실패했습니다. 사유: 인원부족");
          }
        })
        .catch((error) => {
          alert("경작서 생성에 실패했습니다.");
          console.warn(error);
        });
    },
    [user]
  );

  useEffect(() => {
    fetchDutySchedule();
  }, []);

  const dateCellRender = (date) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {schedule.filter((item) => date.isSame(item, "day")).length !== 0 ? (
        <Button
          size="small"
          onClick={() => navigate(`../check-duty/${date.format("YYYY-MM-DD")}`)}
        >
          경작서 확인
        </Button>
      ) : (
        <Button
          size="small"
          type="primary"
          onClick={() => setDutySchedule(date)}
        >
          경작서 작성
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{ backgroundColor: "#ECEBE2" }}
          onBack={() => null}
          title="근무 작성"
        />
        <CustomCalendar dateCellRender={dateCellRender} />
      </Content>
    </Layout>
  );
};

export default WriteDuty;
