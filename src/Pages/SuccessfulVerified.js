import React from "react";
import { Button, Result } from "antd";

const SuccessfulVerified = () => {
  return (
    <Result
      status="success"
      title="Successfully Email Verification!"
      subTitle="your can login within 1-2 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          Login
        </Button>,
        <Button key="buy">Try Again</Button>,
      ]}
    />
  );
};

export default SuccessfulVerified;
