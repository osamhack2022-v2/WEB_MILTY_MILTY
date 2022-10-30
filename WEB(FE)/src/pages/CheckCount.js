import React, { useState, useEffect, useCallback } from "react";
import { Layout, PageHeader, Typography, DatePicker, Space, Row, Col } from 'antd';
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const { Content } = Layout;
const startOfMonth = moment().clone().startOf('month').format("YYYY-MM-DD");
const today = moment().clone().format("YYYY-MM-DD");

const Dutycount = () => {
  const { user } = useAuth();
  const [kind, setKind] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [guardCount, setGuardCount] = useState(0);
  const [cctvCount, setCctvCount] = useState(0);
  const [vigilCount, setVigilCount] = useState(0);

  const dutyCountData = {};

  const fetchDutyKind = useCallback(() => {
    axios
      .post("/api/get-duty", {
        usr_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setKind(response.data.duty);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  const fetchDutySchedule = useCallback(() => {
    axios
      .post("/api/user/get-duty-schedule", {
        user_pid: user.user_pid,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setSchedule(
            response.data.schedule.filter((v) => {
              return moment(v.date).isBetween(startOfMonth, today, undefined, "[]");
            }))
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchDutyKind();
    fetchDutySchedule();
  }, []);

  const countDutyByName = useCallback((dutyKind, schedule) => {
    return schedule.filter(v => v.duty_name === dutyKind).length
  }, [user]);

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="근무 확인"
        />
        <div
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
            padding: "1rem",
          }}>
          <Typography.Title level={3}>
            홍길동 님은 다른 전우들과 근무를 <span>"비슷하게"</span> 들어갔네요!
          </Typography.Title>
          <Space style={{ marginBottom: "10px" }}>
            <Typography.Title level={4} style={{ marginBottom: "0px" }}>
              이번 달의 근무 횟수: {guardCount + cctvCount + vigilCount}
            </Typography.Title>
          </Space>
          <Row justify="space-around" style={{ minHeight: "300px", marginBottom: "10px" }}>
            {kind.map((dutyKind) =>
            (<Col flex="0 1 300px" key={dutyKind.duty_name}>
              <div style={{
                height: "100%",
                backgroundColor: "#D2D2CA",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <Typography.Title
                  level={4}
                  style={{ textAlign: "center" }}>
                  {dutyKind.duty_name}
                </Typography.Title>
                <Typography.Title
                  level={1}
                  style={{ textAlign: "center", marginTop: "10px" }}>
                  {countDutyByName(dutyKind.duty_name, schedule)}회
                </Typography.Title>
              </div>
            </Col>)
            )}
            {/* {<Col flex="0 1 300px">
              <div style={{
                height: "100%",
                backgroundColor: "#D2D2CA",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <Typography.Title
                  level={4}
                  style={{ textAlign: "center" }}>
                  위병소
                </Typography.Title>
                <Typography.Title
                  level={1}
                  style={{ textAlign: "center", marginTop: "10px" }}>
                  {guardCount}회
                </Typography.Title>
              </div>
            </Col>
            <Col flex="0 1 300px">
              <div style={{
                height: "100%",
                backgroundColor: "#D2D2CA",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <Typography.Title
                  level={4}
                  style={{ textAlign: "center" }}>
                  CCTV
                </Typography.Title>
                <Typography.Title
                  level={1}
                  style={{ textAlign: "center", marginTop: "10px" }}>
                  {cctvCount}회
                </Typography.Title>
              </div>
            </Col>
            <Col flex="0 1 300px">
              <div style={{
                height: "100%",
                backgroundColor: "#D2D2CA",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <Typography.Title
                  level={4}
                  style={{ textAlign: "center" }}>
                  불침번
                </Typography.Title>
                <Typography.Title
                  level={1}
                  style={{ textAlign: "center", marginTop: "10px" }}>
                  {vigilCount}회
                </Typography.Title>
              </div>
            </Col>} */}
          </Row>
          {/* {<Typography.Title level={4} style={{ marginBottom: "0px" }}>
            18~20시 근무 투입 횟수: <span>n회</span>
          </Typography.Title>} */}
        </div>
      </Content>
    </Layout>
  )
};

export default Dutycount;
