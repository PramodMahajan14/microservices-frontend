import React, { useEffect, useState } from "react";
import "./Videos.css";
import {
  Upload,
  message,
  Button,
  Icon,
  Input,
  Row,
  Empty,
  Col,
  Modal,
} from "antd";
import { DeliveredProcedureOutlined, UploadOutlined } from "@ant-design/icons";
import Lists from "../../components/Lists";
import UploadFile from "../../components/UploadFile";

const Videos = () => {
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <>
      <Row className="MainContainer">
        <Col span={12} className="video-wrapper">
          <video
            className="video"
            id="video"
            controls="controls"
            preload="none"
            style={{ width: "100%" }}
            poster="https://assets.codepen.io/32795/poster.png"
          >
            <source
              id="mp4"
              src="http://media.w3.org/2010/05/sintel/trailer.mp4"
              type="video/mp4"
            />
            <source
              id="webm"
              src="http://media.w3.org/2010/05/sintel/trailer.webm"
              type="video/webm"
            />

            <track
              kind="subtitles"
              label="English subtitles"
              src="subtitles_en.vtt"
              srclang="en"
              default
            ></track>

            <track
              kind="subtitles"
              label="Deutsche Untertitel"
              src="subtitles_de.vtt"
              srclang="de"
            ></track>

            <p>Your user agent does not support the HTML5 Video element.</p>
          </video>
        </Col>
        <div span={10} className="videoList-wrapper">
          {/* <Empty /> */}
          <Lists />
          {/* -------------------- Attached End------------- */}

          <Button
            block="true"
            type="primary"
            htmlType="submit"
            className="btn UploadfileButton"
            onClick={() => setModal2Open(true)}
          >
            {" "}
            Upload New File
          </Button>
        </div>
        <Modal
          title="Upload Your File Here"
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          <UploadFile />
        </Modal>
      </Row>
    </>
  );
};

export default Videos;
