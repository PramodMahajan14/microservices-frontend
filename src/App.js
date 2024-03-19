import React from "react";
import VirtualList from "rc-virtual-list";
import "./App.css";
import {
  Button,
  Divider,
  Grid,
  Space,
  theme,
  Typography,
  Col,
  Row,
} from "antd";
import Cards from "./components/Cards";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const App = () => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: screens.lg ? token.screenXL : token.screenSM,
      padding: screens.md
        ? `0px ${token.paddingLG}px`
        : `0px ${token.padding}px`,
    },
    divider: {
      margin: 0,
    },
    header: {
      backgroundColor: token.colorBgContainer,
      padding: `${token.paddingLG}px 0px`,
    },
    placeholder: {
      backgroundColor: token.colorBgLayout,
      border: `${token.lineWidth}px dashed ${token.colorBorder}`,
      borderRadius: token.borderRadiusLG,
      padding: token.paddingLG,
      textAlign: "center",
    },
    section: {
      backgroundColor: token.colorBgContainer,
      padding: `${token.sizeXXL}px 0px`,
    },
    tagline: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      margin: "0px",
    },
    titleWrapper: {
      alignItems: screens.md ? "flex-end" : "flex-start",
      justifyContent: "space-between",
      width: "100%",
    },
  };

  return (
    <>
      <div style={styles.header}>
        <div style={styles.container}>
          <Space
            size="middle"
            direction={screens.md ? "horizontal" : "vertical"}
            style={styles.titleWrapper}
          >
            <Space direction="vertical">
              <Title block style={styles.title}>
                Hello user
              </Title>
            </Space>
            <Space>
              <Button>Logout</Button>
            </Space>
          </Space>
        </div>
      </div>
      <Divider style={styles.divider} />
      <div style={styles.section}>
        <div style={styles.container}>
          <Row>
            <Col span={8}>col-12</Col>
            <Col span={16}>
              <div
                style={styles.placeholder}
                className="scrollbar"
                id="style-1"
              >
                <Cards />
                <Divider />
                <Cards />
                <Divider />
                <Cards />
                <Divider />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default App;
