import React from "react";
import { Button, Result } from "antd";
import "./Result.css";
const ResultComponent = () => (
  <Result
    className="resultcomp"
    status="success"
    title="Successfully Mail sent on your  Mail ID!"
    subTitle="We have sent Mail on your Mail ID Please verify mail, "
    extra={[
      <Button type="primary" key="console">
        Go Back
      </Button>,
    ]}
  />
);
export default ResultComponent;
