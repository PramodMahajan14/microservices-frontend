import React, { useContext, useState } from "react";
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
  Col,
  Row,
} from "antd";
import "../../index.css";
import "../../Pages/Login.css";
import { LockOutlined, MailOutlined, LockFilled } from "@ant-design/icons";
import { AccountContext } from "../../Context/AccountContext";
import "../../index.css";
import HeaderFooter from "../../components/HeaderFooter";
import forgot from "../../Images/undraw_account_re_o7id.svg";
import { ReactComponent as SmallLogo } from "../../Images/MainLogo.svg";
import { ReactComponent as SentMail } from "../../Images/undraw_mail_sent_re_0ofv.svg";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const ForgotPassword = () => {
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
    });
  };

  const onFinish = (values) => {
    setloader(true);
    const { email, password } = values;
    console.log(email, password, process.env.REACT_APP_SERVER);
    fetch("http://localhost:4002/user/login", {
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

        if (data.statuscode === 200) {
          setUser({ loggedIn: true });
          navigate("/home");
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
        ? `${token.paddingXL - 20}px`
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
      display: "grid",
      justifyContent: "center",
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
    sentmail: {
      marginBottom: token.marginXL,
      display: "grid",
      justifyContent: "center",
      textAlign: "center",
    },
    sentmailImg: {
      width: "100%",
      height: "250px",
    },

    // logo: {
    //   height: "27px",
    //   width: "27px",
    //   marginLeft: "140px",
    // },
  };

  return (
    <HeaderFooter
      child={
        <>
          <Row gutter={[10]} style={{ minHeight: "100%", minWidth: "100%" }}>
            {contextHolder}

            <Col
              xs={23}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={styles.container}
            >
              <div className="column">
                {true ? (
                  <div style={styles.container}>
                    <div style={styles.header}>
                      <Text style={styles.text}>
                        Enter the email address associated with your account and
                        we'll send you a link to reset password.
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

                      <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit">
                          {loader ? (
                            <div>
                              <Spin size="small" className="spin" /> Please Wait
                            </div>
                          ) : (
                            "Continue"
                          )}
                        </Button>
                        <div>
                          Don't have an account?{" "}
                          <Link href="/signup">Sign Up</Link>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                ) : (
                  <div style={styles.sentmail}>
                    <SentMail style={styles.sentmailImg} />
                    <Text>
                      We have sent link on mail Please check it and reset your
                      password.
                    </Text>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default ForgotPassword;
