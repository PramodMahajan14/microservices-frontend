import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import VirtualList from "rc-virtual-list";
import "../App.css";
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
import Cards from "../components/Cards";
import PostForm from "../components/PostForm";
import { PostsConetext } from "../Context/PostConetxt";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const Home = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const Navigate = useNavigate();
  const { Posts, setPosts } = useContext(PostsConetext);

  const [BlogData, setBlogData] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/post/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // setBlogData(data);
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

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
              <Title
                block
                style={styles.title}
                onClick={() => Navigate("/home/dashboard")}
              >
                Hello User
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
            <Col span={8}>
              <div className="container">
                {" "}
                <PostForm />
              </div>
            </Col>
            <Col span={16}>
              <div
                style={styles.placeholder}
                className="scrollbar"
                id="style-1"
              >
                {Posts.map((post) => {
                  return (
                    <Cards
                      title={post.title}
                      content={post.content}
                      id={post.postId}
                      Like={post.likes}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default Home;
