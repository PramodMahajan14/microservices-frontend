import { useNavigate } from "react-router";
import { message, Alert } from "antd";
const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const [Auttoken, setToken] = useState();
  const [loginUser, setLoginUser] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  // useEffect(() => {
  //   console.log(Auttoken);
  //   fetch("http://localhost:4002/user/access", {
  //     credentials: "include",
  //   })
  //     .catch((err) => {
  //       console.log("Not LoggedIn");
  //       setUser({ loggedIn: false });
  //       return;
  //     })
  //     .then((resp) => {
  //       if (resp === undefined) {
  //         return;
  //       }
  //       if (!resp.ok) {
  //         error("Network response was not ok " + resp.statusText);
  //         return;
  //       }
  //       return resp.json();
  //     })
  //     .then((data) => {
  //       console.log("Not LoggedIn second then", data);
  //       if (data) {
  //         setUser({ loggedIn: true });
  //         navigate("/home");
  //       } else {
  //         console.log("Not LoggedIn", data);
  //         setUser({ loggedIn: false });
  //         navigate("/");
  //       }
  //     });
  // }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {contextHolder}
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
