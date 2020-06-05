import React from "react";

//icons
import facbookIcon from "../../../Resources/icons/facebook.svg";
import instgramIcon from "../../../Resources/icons/instgram.svg";
import twitterIcon from "../../../Resources/icons/twitter.svg";
import linkdinIcon from "../../../Resources/icons/linkedin.svg";

import "./Footer.scss";
const UrlMDBImg =
  "https://www.themoviedb.org/assets/2/v4/logos/312x276-primary-blue-fb50dee3bf664c866fd216e6cee64af33d20707ea3091ddc65c5e8aa4c152eb2.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_info">
        <div className="icons">
          <img src={facbookIcon} />
          <img src={instgramIcon} />
          <img src={twitterIcon} />
          <img src={linkdinIcon} />
        </div>
        <div className="thanks-too">
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/freepik"
            target="blanc"
            title="Freepik"
          >
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" target="blanc" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <div className="footer_info-text">
          Build with <span style={{ color: "red" }}>&hearts;</span> by
          Abderrahim Baad
          <div className="copyright"> CopyRight &copy; 2020</div>
        </div>
      </div>
      <div className="horizontle-devider" />
      <div className="footer_images">
        <div className="myLogo">MyFilx</div>
        <img src={UrlMDBImg} alt="TMDB" className="tmdb-logo" />
      </div>
    </footer>
  );
};

export default Footer;
