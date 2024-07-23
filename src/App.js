import React from "react";
import "./App.css";
import Views from "./Views";
import UserContext from "./Context/AccountContext";
import PostConetxt from "./Context/PostConetxt";

const App = () => {
  return (
    <>
      <UserContext>
        <PostConetxt>
          {" "}
          <Views />
        </PostConetxt>
      </UserContext>
    </>
  );
};

export default App;
