import React from "react";
import './Footer.scss';

const Footer = () => {
  return(
    <div className="Footer">
      <div className="Footer__container">
        <div className="Footer__header">
          <div className="FooterLogo"></div>
          <div className="FooterFollowUs"></div>
        </div>
        <div className="Divider"></div>
        <div className="Footer__text"></div>
      </div>
    </div>
  );
};

export default Footer;