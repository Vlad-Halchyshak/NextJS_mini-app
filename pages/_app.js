import s from "../styles/globals.css";
import React from "react";
import { EditInfo } from "../components/edit";

function MyApp() {
  const image = require("../assets/image.png");

  return (
    <div className="container">
      <div className="header_info">
        <img src={image} />
        <p>Иванова А.</p>
      </div>
      <div className="header_block">
        <h5>ЛИЧНЫЙ ПРОФИЛЬ</h5>
        <p>Главная/Личный профиль</p>
      </div>
      <EditInfo />
    </div>
  );
}

export default MyApp;
