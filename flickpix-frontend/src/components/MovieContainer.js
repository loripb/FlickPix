import React, { Component } from 'react';

class MovieContainer extends Component {

  render() {
    return (
      <div onClick={ this.props.handleButtonClick }>hello from movie container</div>
    );
  }

}

export default MovieContainer;
