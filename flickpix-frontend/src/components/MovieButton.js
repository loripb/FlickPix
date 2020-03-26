import React from 'react';

const MovieButton = (props) => {

  return (
    <div className="ui container">
      <div className="ui text container">
        <button className="ui fluid red massive button" onClick={ props.handleButtonClick }>Get a random Movie!</button>
      </div>
    </div>
  );
};

export default MovieButton;
