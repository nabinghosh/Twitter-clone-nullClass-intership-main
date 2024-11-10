import React from "react";
import "./SidebarOptions.css";
import HomeIcon from "@mui/icons-material/Home";

function SidebarOptions({ active, text, Icon }) {
  return (
    // <div className={`sidebarOptions ${active && "sidebarOptions--active"}`}>
    <div className={`sidebarOptions ${ "sidebarOptions--active"}`}>
       <Icon  className="me-3 ms-3"/>
      <h2>{text}</h2>
     </div>
  );
}

export default SidebarOptions;