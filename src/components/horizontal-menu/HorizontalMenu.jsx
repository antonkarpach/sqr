import React from "react";
import './HorizontalMenu.scss';
import Container from "../conteiner/Conteiner";

const HorizontalMenu = () => {
  return (
    <div className="HorizontalMenu">
     <Container>
       <div className="oleg">
       <div>Dashboard</div>
       <div>News</div>
       <div>About us</div>
       <div>Partners</div>
       </div>
     </Container>
    </div>
  );
};

export default HorizontalMenu;