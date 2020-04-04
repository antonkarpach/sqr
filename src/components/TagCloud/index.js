import React from "react";
import { browserHistory } from "react-router";
import TagCloud from "react-tag-cloud";

const defTagStyle = {
  fontSize: 50,
  transition: '1s'
};

const defCloudStyle = {
  fontFamily: 'Oswald',
  fontSize: 30,
  fontWeight: 'bold',
  color: 'dark',
  padding: 5,
  width: '25%',
  height: 400,
  margin: '0 auto'
};

const search2 = ({ target }) => {
  if(!target.children.length) browserHistory.push(`/search?tag=${target.textContent}`);
};

export default ({ tags, tagStyle, cloudStyle, search }) => {
  tagStyle = Object.assign(defTagStyle, tagStyle);
  cloudStyle = Object.assign(defCloudStyle, cloudStyle);
  return (
    <TagCloud style={cloudStyle} onClick={search || search2}>
      { tags.map(tag => <div style={tagStyle}>{tag.text}</div>) }
    </TagCloud>
  )
}