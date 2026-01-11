import React from "react";
import { Home } from "./home/Home";

const Sidebar = () => {
  const [tab, setTab] = React.useState("home");
  return <>{tab === "home" ? <Home /> : null}</>;
};

export default Sidebar;
