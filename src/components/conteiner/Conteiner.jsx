import React from "react";
import './Conteiner.scss';

const Container = (props) => {
  return(
    <div className="Container">
      <div className={'Container__container'}>
        {props.children}
      </div>
    </div>
  );
};

export default Container;