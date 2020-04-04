import React from 'react';

import './Comment.css';

import likeIcon from '../img/like.png';
import like2Icon from '../img/like2.png';
import connect from "react-redux/es/connect/connect";

const Comment = ({ data, store, like }) => {
  let likes = JSON.parse(data.likes);
  let isLike = likes.includes(store.user.id);

  return (
    <table className="comment">
      <tr>
        <td>
          <strong className={'author'}>{ data.firstName }: </strong>
          <span className={'content'}>{ data.text }</span>
        </td>
        <td><img src={ isLike ? like2Icon : likeIcon } style={{ opacity: isLike ? 1 : 0.25 }} onClick={() => like(data.id)}/></td>
        <td>{likes.length || ''}</td>
      </tr>
    </table>
  );
};


export default connect(store => ({ store }), null)(Comment);
