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
  Flex,
} from "antd";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { AccountContext } from "../../Context/AccountContext";
import "../../index.css";

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
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      alignItems: "center",

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
    footertext: {
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
    <section style={styles.section}>
      {contextHolder}

      <div style={styles.container}>
        <div style={styles.header}>
          {/* <Title style={styles.title}>Sign in</Title> */}
          <Text style={styles.text}>
            Welcome back to Microservices Please enter your Email Id
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
                "Log In"
              )}
            </Button>
            <div style={styles.footer}>
              <br />
              <Link href="/forgot">Forgot Password</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default ForgotPassword;
