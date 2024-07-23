import React, { useState } from "react";
import {
  Card,
  Menu,
  Dropdown,
  List,
  Avatar,
  Flex,
  Divider,
  Input,
  Form,
  Button,
} from "antd";
import {
  LikeOutlined,
  CommentOutlined,
  CaretRightOutlined,
  LikeFilled,
  UserOutlined,
} from "@ant-design/icons";
import "./Card.css";

let author = "65f2d50969627502866b8b03";
const Comment = ({ data }) => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data.slice().reverse()}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={
                <Flex justify="space-between">
                  {" "}
                  {"pramod"}{" "}
                  <p className="comment-date">{`${new Date(item.creationDate)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}-${(
                    new Date(item.creationDate).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${new Date(
                    item.creationDate
                  ).getFullYear()}`}</p>{" "}
                </Flex>
              }
              description={item.content}
            />
          </List.Item>
        )}
      />
    </>
  );
};

function Cards({ title, content, id, Like }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleMenuClick = async () => {};

  const getAllComments = async () => {
    try {
      const response = await fetch(`http://localhost:4001/comment/coms/${id}`);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await response.json();
      setcomments(data);
      // Handle successful form submission
      console.log("Form submitted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch(`http://localhost:4001/comment/com/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You may need to include additional headers such as authorization tokens
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }
      getAllComments();

      // Optionally, do something with the response data if needed
      console.log("Comment posted successfully:");
    } catch (error) {
      console.error("Error posting comment:", error);
      // Rethrow the error to the caller for further handling
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{
        maxHeight: 300,
        overflowY: "auto",
        overflowX: "hidden",
        width: 470,
      }}
    >
      <Form name="blog_form" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="content"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input
            placeholder="Enter comment"
            style={{ marginRight: 8 }}
            suffix={
              <Button htmlType="submit">
                <CaretRightOutlined
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  className="commentbox"
                />
              </Button>
            }
          />
        </Form.Item>
      </Form>
      <Divider plain>Comments</Divider>
      <Comment data={comments} />
    </Menu>
  );

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:4000/post/like/${id}`);
      setLiked(true);
      setLikeCount(likeCount + 1);
      console.log(response);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <>
      <div class="card">
        <div class="row ">
          <div class="col-md-8 px-3">
            <div class="card-block px-3 text-left">
              <h4 class="card-title py-3">
                <Avatar size="small" icon={<UserOutlined />} /> {title}
              </h4>
              <p class="card-text ">{content}</p>

              <Flex
                gap="large"
                horizontal
                style={{ padding: "5px", cursor: "pointer" }}
              >
                {liked ? (
                  <LikeFilled>
                    <span>{Like + 1}</span>
                  </LikeFilled>
                ) : (
                  <LikeOutlined
                    onClick={handleLike}
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                )}

                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  onClick={getAllComments}
                >
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
        </div>
      </div>
    </>
  );
}

export default Cards;
