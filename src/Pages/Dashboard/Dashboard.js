import React, { useState } from "react";
import {
  VideoCameraOutlined,
  FileImageOutlined,
  SoundFilled,
  UserOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Flex,
  Avatar,
  Space,
  Dropdown,
} from "antd";
import Videos from "../Video/Videos";
import Music from "../Music/Music";
import Photos from "../Photos/Photos";
import { ReactComponent as Logo } from "../../Images/logosvg.svg";
const { Header, Content, Footer, Sider } = Layout;

export const RenderingSubScreen = ({ index, video, photos, music }) => {
  switch (index) {
    case 0:
      return video;
      break;
    case 1:
      return photos;
      break;
    case 2:
      return music;
      break;

    default:
      return video;
      break;
  }
};

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" style={{ fontSize: "20px" }}>
        Profile
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" style={{ fontSize: "20px" }}>
        Logout
      </a>
    ),
  },
];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [profilebage, setprofilebage] = useState(true);
  const [langModal, setLangModal] = useState(false);
  const [isSelectedPage, setIsSelectedPage] = useState(0);
  const [currentPageName, setCurrentPageName] = useState("video");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <Logo className="LogoAtHome" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            label="Video"
            icon={<VideoCameraOutlined />}
            onClick={() => {
              setIsSelectedPage(0);
              setCurrentPageName("video");
            }}
          >
            Video
          </Menu.Item>

          <Menu.Item
            key="2"
            label={"Images"}
            icon={<FileImageOutlined />}
            onClick={() => {
              setIsSelectedPage(1);
              setCurrentPageName("photos");
            }}
          >
            Image
          </Menu.Item>
          <Menu.Item
            key="3"
            label={"music"}
            icon={<SoundFilled />}
            onClick={() => {
              setIsSelectedPage(2);
              setCurrentPageName("music");
            }}
          >
            Musics
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,

            display: "flex",
            justifyContent: "justify-content",
            textAlign: "center",
          }}
        >
          <div className="header-pageName">Home</div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <Menu.Item key="1" style={{ marginLeft: "50px" }}>
              <Dropdown menu={{ items }} placement="bottomRight">
                <Avatar
                  size={{
                    xs: 28, // <576px
                    sm: 32, // ≥576px
                    md: 40, // ≥768px
                    lg: 48, // ≥992px
                    xl: 50, // ≥1200px
                    xxl: 50, // ≥1600px
                  }}
                  icon={<UserOutlined style={{ fontSize: "30px" }} />}
                />
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="InnerComponents"
        >
          <RenderingSubScreen
            index={isSelectedPage}
            video={<Videos />}
            music={<Music />}
            photos={<Photos />}
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
