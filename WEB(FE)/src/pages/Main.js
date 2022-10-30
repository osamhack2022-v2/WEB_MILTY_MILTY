import React, { useEffect } from "react";
import moment from "moment";
import { Layout, PageHeader, Typography } from "antd";
import { useAuth } from "../hooks/useAuth";
import Precept from "../components/Precept";

const { Content } = Layout;
const { Title } = Typography;

const Main = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            backgroundColor: "#ECEBE2",
          }}
          title={"오늘의 경계작전명령서"}
        />
        <Precept date={moment().format("YYYY-MM-DD")} />
      </Content>
    </Layout>
  );
};

export default Main;
