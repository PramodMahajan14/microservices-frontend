import { Routes, Route } from "react-router-dom";
import "./Main.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PrivateRoutes from "./PrivateRoutes";
import { useContext } from "react";
import { AccountContext } from "./Context/AccountContext";
import { Spin } from "antd";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResultComponent from "./Pages/Result/ResultComponen";
import SuccessfulVerified from "./Pages/SuccessfulVerified";
import Notfound from "./Pages/Notfound";
import ServerError from "./Pages/ServerError";
import HeaderFooter from "./components/HeaderFooter";
const Views = () => {
  const { user } = useContext(AccountContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/forgot/result" element={<ResultComponent />} />
      {/* <Route element={<PrivateRoutes />}> */}
      <Route path="/home" element={<Dashboard />} />
      <Route path="/tem" element={<HeaderFooter />} />
      {/* </Route> */}
      <Route path="/successfulverified" element={<SuccessfulVerified />} />
      <Route path="/notfound" element={<Notfound />} />
      <Route path="/server_error" element={<ServerError />} />
    </Routes>
  );
};
export default Views;
