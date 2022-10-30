import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  EditOutlined,
  ControlOutlined,
  UserOutlined,
  ExportOutlined,
  SwapOutlined,
  CommentOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import WriteDuty from "./WriteDuty";
import CheckDutyPrecept from "./CheckDutyPrecept";
import Exemptlist from "./Exemptlist";
import SetDuty from "./SetDuty";
import Soldierlist from "./Soldierlist";
import Request from "./Request";
import Reportlist from "./Reportlist";
import { useAuth } from "../hooks/useAuth";

const { Sider } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider collapsible collapsedWidth="0" breakpoint="lg" width="18rem">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/logo_crop.png`}
              alt="MILTY 로고"
              style={{
                maxWidth: "80%",
                display: "block",
                margin: "3rem auto",
              }}
            />
          </Link>
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: "write-duty",
                icon: <EditOutlined />,
                label: "근무 작성",
                onClick: () => {
                  navigate("/admin/write-duty");
                },
              },
              {
                key: "set-duty",
                icon: <ControlOutlined />,
                label: "장병 일반 근무 설정",
                onClick: () => {
                  navigate("/admin/set-duty");
                },
              },
              {
                key: "soldierlist",
                icon: <UserOutlined />,
                label: "장병 리스트",
                onClick: () => {
                  navigate("/admin/soldierlist");
                },
              },
              {
                key: "exemptlist",
                icon: <ExportOutlined />,
                label: "열외자 목록",
                onClick: () => {
                  navigate("/admin/exemptlist");
                },
              },
              {
                key: "request",
                icon: <SwapOutlined />,
                label: "근무 변경 요청 목록",
                onClick: () => {
                  navigate("/admin/request");
                },
              },
              {
                key: "reportlist",
                icon: <CommentOutlined />,
                label: "건의 사항",
                onClick: () => {
                  navigate("/admin/reportlist");
                },
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "로그아웃",
                onClick: () => {
                  logout();
                },
              },
            ]}
          />
        </Sider>
        <Routes>
          <Route path="/write-duty" element={<WriteDuty />} />
          <Route path="/check-duty/:date" element={<CheckDutyPrecept />} />
          <Route path="/exemptlist" element={<Exemptlist />} />
          <Route path="/set-duty" element={<SetDuty />} />
          <Route path="/soldierlist" element={<Soldierlist />} />
          <Route path="/request" element={<Request />} />
          <Route path="/reportlist" element={<Reportlist />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default Admin;
