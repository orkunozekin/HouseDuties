import React from 'react';


const ValidationError = (props) => {
  if (props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}

export default ValidationError