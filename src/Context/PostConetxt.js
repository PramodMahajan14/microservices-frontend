import React, { createContext, useState } from "react";

export const PostsConetext = createContext();
export const PostConetxt = ({ children }) => {
  const [Posts, setPosts] = useState([]);
  return (
    <PostsConetext.Provider value={{ Posts, setPosts }}>
      {children}
    </PostsConetext.Provider>
  );
};
export default PostConetxt;
