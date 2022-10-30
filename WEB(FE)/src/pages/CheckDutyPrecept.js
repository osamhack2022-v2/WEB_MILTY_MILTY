import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, PageHeader } from "antd";
import Precept from "../components/Precept";

const { Content } = Layout;

const CheckDutyPrecept = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => navigate(-1)}
          title={`경계작전명령서 (${params.date})`}
        />
        <Precept date={params.date} />
      </Content>
    </Layout>
  );
};

export default CheckDutyPrecept;
