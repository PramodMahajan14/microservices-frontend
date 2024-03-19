import React, { useState } from "react";
import { Card, Menu, Dropdown, List, Avatar, Flex, Divider, Input } from "antd";
import {
  LikeOutlined,
  CommentOutlined,
  CaretRightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Card.css";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const Comment = () => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

function Cards() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMenuClick = (e) => {
    setSelectedOption(e.key);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{ maxHeight: 300, overflowY: "auto", width: 470 }}
    >
      <Input
        placeholder="Enter value"
        style={{ marginRight: 8 }}
        suffix={
          <CaretRightOutlined
            style={{
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        }
      />{" "}
      <Divider plain>Comments</Divider>
      <Comment />
    </Menu>
  );

  return (
    <section>
      <div class="container py-3">
        <div class="card">
          <div class="row ">
            <div class="col-md-8 px-3">
              <div class="card-block px-3 text-left">
                <h4 class="card-title py-3">
                  <Avatar size="small" icon={<UserOutlined />} /> INTRODUCTION
                  DIVE (BOAT DIVE, 1 DAY, 1 DIVE)
                </h4>
                <p class="card-text ">
                  Not a certified diver and only have 1 day free? Our
                  Introduction Dive experience is what you need. The Intro Dive
                </p>

                <Flex
                  gap="large"
                  horizontal
                  style={{ padding: "5px", cursor: "pointer" }}
                >
                  {2}{" "}
                  <LikeOutlined
                    style={{
                      fontSize: "20px",

                      cursor: "pointer",
                    }}
                  />
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <CommentOutlined
                      style={{
                        fontSize: "20px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                    >
                      {selectedOption ? selectedOption : ""}{" "}
                    </CommentOutlined>
                  </Dropdown>
                </Flex>
              </div>
            </div>
            <div class="col-md-4 bg-intro"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cards;
