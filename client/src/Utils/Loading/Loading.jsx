import React from "react";

import LoadingImage from "../../Resources/images/Loading.gif";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading_container" style={{ height: "100vh" }}>
      <img className="loading_img" src={LoadingImage} />
    </div>
  );
};

export default Loading;
