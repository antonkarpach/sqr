import React from 'react';

import './Comment.css';

import like2Icon from '../img/any/heart-solid.svg';
import likeIcon from '../img/any/heart-regular.svg';
import connect from "react-redux/es/connect/connect";

const Comment = ({data, store, like}) => {
  let likes = JSON.parse(data.likes);
  let isLike = likes.includes(store.user.id);

  return (
    <div className="comment">
      <div className={'author'}>{data.firstName}:</div>
      <div className="content">
        <div>{data.text}</div>
        <div style={{marginRight: "4px"}}><img src={isLike ? like2Icon : likeIcon} style={{opacity: isLike ? 1 : 0.25}}
                  onClick={() => like(data.id)}/></div>
        <div>{likes.length || ''}</div>
      </div>
    </div>
  );
};


export default connect(store => ({store}), null)(Comment);
