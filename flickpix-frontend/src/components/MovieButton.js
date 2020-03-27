import React from 'react';

const MovieButton = (props) => {

  let handleClick = () => {
    props.shuffle()
  }

  return (
    <div className="ui container">
      <div className="ui text container">
        <button className="ui fluid red massive button" onClick={ props.handleButtonClick }>Get A Random Movie!</button>
        <button className="ui orange large button" onClick={ handleClick }>Shuffle</button>
      </div>
    </div>
  );
};

export default MovieButton;
