import React, { useState } from "react";
import { Avatar, Image } from "antd";
import { Link } from "react-router-dom";


export default function Logo() {
  const [collapsed, setCollapse] = useState(false);
  return (
    <span style={{}}>
      <Link to={"/home"}>
        <Image
          width={100}
          src="/images/logos/logo1.png"
          preview={false}
          style={{ alignContent: "center", marginLeft: 15 }}
        />
      </Link>
    </span>
  );
}
