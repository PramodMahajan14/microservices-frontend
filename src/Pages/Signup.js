import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import {
  Button,
  Checkbox,
  Grid,
  Input,
  theme,
  Form,
  Typography,
  Flex,
  message,
  Spin,
  Layout,
  Row,
  Col,
  Menu,
} from "antd";

import login from "../Images/undraw_undraw_undraw_undraw_sign_up_ln1s_-1-_s4bc_-1-_ee41_-1-_kf4d.svg";
import {
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { AccountContext } from "../Context/AccountContext";
import { ReactComponent as Logo } from "../Images/logosvg.svg";
const { Header, Footer, Sider, Content } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Signup = () => {
  const { setUser, setrefresh_token } = useContext(AccountContext);
  const [loader, setloader] = useState(false);
  const [SentMail, setSentMail] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const onFinish = (values) => {
    setloader(true);
    const { email, password, name } = values;
    console.log(email, password, name);
    fetch("http://localhost:4002/v1/api/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ username: name, email, password }),
    })
      .catch((err) => {
        console.log("error ==> ", err.status);
        setloader(false);
        error(err);
      })
      .then(async (res) => {
        let data = await res.json();
        console.log(data);
        setloader(false);
        // if (data === "undefined") {
        //   error("InValid User");
        //   return;
        // }
        if (data.statuscode == 201) {
          setSentMail(false);
          return;
        } else {
          error(data.msg);
        }
      });
  };

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 50,
    });
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    logo: {
      height: "27px",
      width: "27px",
      marginLeft: "140px",
    },

    MessageBox: {},
    ContentText: {
      alignItems: "center",
      textAlign: "center",
      display: "block",
      overflow: "wrap",
    },
    text: {
      fontSize: "15px",
    },
  };
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      {contextHolder}
      <Header
        style={{
          color: "white",
          fontSize: "20px",
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Logo className="Logo" />
      </Header>
      <Content style={{ flex: 1 }}>
        <Row gutter={[16, 16]} style={{ minHeight: "100%", minWidth: "100%" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="column">
              <div style={styles.container}>
                {SentMail ? (
                  <>
                    <div style={styles.header}>
                      <Title style={styles.title}>Sign in</Title>
                      <Text style={styles.text}>
                        Welcome back to Microservices Please enter your details
                        below to sign in.
                      </Text>
                    </div>
                    <Form
                      name="normal_login"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      layout="vertical"
                      requiredMark="optional"
                    >
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            type: "string",
                            required: true,
                            message: "Please input your Name!",
                          },
                        ]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Name" />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: "email",
                            required: true,
                            message: "Please input your Email!",
                          },
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Password!",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Form.Item
                          name="remember"
                          valuePropName="checked"
                          noStyle
                        >
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                      </Form.Item>
                      <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit">
                          {loader ? (
                            <div>
                              <Spin size="small" className="spin" /> Please Wait
                            </div>
                          ) : (
                            "Sign Up"
                          )}
                        </Button>
                        <div style={styles.footer}>
                          <Text style={styles.text}>You have an account?</Text>{" "}
                          <Link href="/">Sign In now</Link>
                        </div>
                      </Form.Item>
                    </Form>
                  </>
                ) : (
                  <div style={styles.MessageBox}>
                    <Title style={styles.title}>
                      <ArrowLeftOutlined onClick={() => setSentMail(true)} />
                    </Title>
                    <Text style={styles.ContentText}>
                      <Title style={styles.title}>Verification Required</Title>
                      <p style={styles.text}>
                        {" "}
                        You must verify your email address before you can
                        complete check-out. Please click the Verification link
                        sent to pramod@gmail.com
                      </p>
                    </Text>

                    <Flex vertical gap="small">
                      <Button type="primary" block style={{ fontSize: "18px" }}>
                        Resend Verification Email
                      </Button>
                    </Flex>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            className="ImageContainer"
          >
            <div className="column">
              <img src={login} />
            </div>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>copyright @ !PY</Footer>
    </Layout>
  );
};

export default Signup;
{
  /* */
}
