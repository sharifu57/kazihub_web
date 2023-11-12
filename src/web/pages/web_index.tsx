import React from "react";
import Home from "./home/home";
import Division from "./division/division";

export default function WebIndex() {
  return (
    <>
      <Home />
      <div
        style={{ marginRight: "150px", marginLeft: "180px",}}
      >
        <Division />
      </div>
    </>
  );
}
