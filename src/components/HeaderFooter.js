import React, { useContext, useState } from "react";

import { ReactComponent as Logo } from "../Images/logosvg.svg";
import { ReactComponent as SmalLogo } from "../Images/MainLogo.svg";

import "../index.css";

import { theme, Grid, Layout } from "antd";
const { Header, Footer, Content } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const HeaderFooter = ({ child }) => {
  const { token } = useToken();
  const screens = useBreakpoint();

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
    <Layout
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        minWidth: "100%",
        position: "fixed",
      }}
    >
      <Header style={{ color: "white", fontSize: "20px" }}>
        <Logo className="Logo" />
      </Header>
      <Content style={{ flex: 1 }}>{child}</Content>
      <Footer style={{ textAlign: "center" }}>Copy @ 2024 TechStore.in</Footer>
    </Layout>
  );
};

export default HeaderFooter;
