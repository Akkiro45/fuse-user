import React from 'react';

const space = (props) => {
  let style = {
  };
  if(props.width) style.width = props.width;
  if(props.height) style.height = props.height;
  return (
    <div style={style} ></div>
  )
}

export default space;