import React from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const UploadFile = () => {
  const props = {
    name: "file",
    action: "//jsonplaceholder.typicode.com/posts/",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result);
        };
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <div>
        <Upload {...props} className="fileUploader">
          <Button className="fileuploaderIcon" icon={<UploadOutlined />}>
            Select
          </Button>
        </Upload>

        <Button type="submit" className="btn uploadButton">
          Submit
        </Button>
      </div>
    </>
  );
};

export default UploadFile;
