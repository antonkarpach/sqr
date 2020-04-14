import React from "react";
import './Footer.scss';
import fb from '../img/any/facebook-square-brands.svg';
import ln from '../img/any/linkedin-brands.svg';
import tw from '../img/any/twitter-square-brands.svg';

const Footer = () => {
  return(
    <div className="Footer">
      <div className="Footer__container">
        <div className="Footer__header">
          <div className="FooterLogo"></div>
          <div className="FooterFollowUs">
            <div className="FooterFollowUs__label">Follow us</div>
            <a className="FooterFollowUs__link"><img src={fb}></img></a>
            <a className="FooterFollowUs__link"><img src={tw}></img></a>
            <a className="FooterFollowUs__link"><img src={ln}></img></a>
          </div>
        </div>
        <div className="Divider"></div>
        <div className="Footer__text">
          <p>Intelligence Compendium ICF is an SEC-registered investment helper.</p>
          <p>Intelligence Compendium ICF helps to share knowledge all over the world</p>
          <p>Important Disclosures</p>
          <p>© 2020 Intelligence Compendium ICF. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;