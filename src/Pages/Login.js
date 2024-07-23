import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import {
  Button,
  Checkbox,
  Grid,
  Input,
  theme,
  Form,
  Typography,
  message,
  Spin,
  Row,
  Col,
} from "antd";
import login from "../Images/undraw_login_re_4vu2.svg";
import { ReactComponent as Logo } from "../Images/logosvg.svg";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { AccountContext } from "../Context/AccountContext";
import "../index.css";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { Flex, Layout, Menu } from "antd";
import HeaderFooter from "../components/HeaderFooter";
const { Header, Footer, Sider, Content } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Login = () => {
  const { setUser } = useContext(AccountContext);
  const [loader, setloader] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 5,
    });
  };

  const onFinish = (values) => {
    setloader(true);
    const { email, password } = values;
    console.log(email, password, process.env.REACT_APP_SERVER);
    fetch("http://localhost:4002/v1/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        setloader(false);
        let data = await res.json();
        console.log("data ==> ", data);

        if (data.statuscode == 200) {
          setUser({ loggedIn: true });
          navigate("/home");
        } else if (data.statuscode == 202) {
          message.warning(data.msg, 7);
        } else {
          console.log("error errirr");
          error(data.msg);
          return;
        }
      })
      .catch((err) => {
        console.log("error ==> ", err);
        error("server error");
        setloader(false);
        return;
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
  };

  return (
    // <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
    //   {contextHolder}
    //   <Header style={{ color: "white", fontSize: "20px" }}>

    //     <Logo className="Logo" />

    //   </Header>
    //   <Content style={{ flex: 1 }}>
    //     <Row gutter={[16, 16]} style={{ minHeight: "100%", minWidth: "100%" }}>
    //       <Col
    //         xs={23}
    //         sm={12}
    //         md={12}
    //         lg={12}
    //         xl={12}
    //         className="ImageContainer"
    //       >
    //         <div className="column">
    //           <img src={login} />
    //         </div>
    //       </Col>
    //       <Col xs={23} sm={12} md={12} lg={12} xl={12}>
    //         <div className="column">
    //           <div style={styles.container}>
    //             <div style={styles.header}>
    //               <Title style={styles.title}>Sign in</Title>
    //               <Text style={styles.text}>
    //                 Welcome back to Microservices Please enter your details
    //                 below to sign in.
    //               </Text>
    //             </div>
    //             <Form
    //               name="normal_login"
    //               initialValues={{
    //                 remember: true,
    //               }}
    //               onFinish={onFinish}
    //               layout="vertical"
    //               requiredMark="optional"
    //             >
    //               <Form.Item
    //                 name="email"
    //                 rules={[
    //                   {
    //                     type: "email",
    //                     required: true,
    //                     message: "Please input your Email!",
    //                   },
    //                 ]}
    //               >
    //                 <Input prefix={<MailOutlined />} placeholder="Email" />
    //               </Form.Item>
    //               <Form.Item
    //                 name="password"
    //                 rules={[
    //                   {
    //                     type: "password",
    //                     required: true,
    //                     message: "Please input your Password!",
    //                   },
    //                 ]}
    //               >
    //                 <Input prefix={<LockOutlined />} placeholder="Password" />
    //               </Form.Item>
    //               <Form.Item>
    //                 <Form.Item name="remember" valuePropName="checked" noStyle>
    //                   <Checkbox>Remember me</Checkbox>
    //                 </Form.Item>
    //               </Form.Item>
    //               <Form.Item style={{ marginBottom: "0px" }}>
    //                 <Button block="true" type="primary" htmlType="submit">
    //                   {loader ? (
    //                     <div>
    //                       <Spin size="small" className="spin" /> Please Wait
    //                     </div>
    //                   ) : (
    //                     "Log In"
    //                   )}
    //                 </Button>
    //                 <div>
    //                   <Text style={styles.footertext}>
    //                     Don't have an account?{" "}
    //                     <Link href="/signup">Sign up now</Link>
    //                   </Text>{" "}
    //                   <br />
    //                   <Link href="/forgot">Forgot Password</Link>
    //                 </div>
    //               </Form.Item>
    //             </Form>
    //           </div>
    //         </div>
    //       </Col>
    //     </Row>
    //   </Content>
    //   <Footer style={{ textAlign: "center" }}>Footer</Footer>
    // </Layout>
    <>
      <HeaderFooter
        child={
          <>
            <Row
              gutter={[16, 16]}
              style={{ minHeight: "100%", minWidth: "100%" }}
            >
              <Col
                xs={23}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className="ImageContainer"
              >
                <div className="column">
                  <img src={login} />
                </div>
              </Col>
              <Col xs={23} sm={12} md={12} lg={12} xl={12}>
                <div className="column">
                  <div style={styles.container}>
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
                            type: "password",
                            required: true,
                            message: "Please input your Password!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<LockOutlined />}
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
                            "Log In"
                          )}
                        </Button>
                        <div>
                          <Text style={styles.footertext}>
                            Don't have an account?{" "}
                            <Link href="/signup">Sign up now</Link>
                          </Text>{" "}
                          <br />
                          <Link href="/forgot">Forgot Password</Link>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default Login;
