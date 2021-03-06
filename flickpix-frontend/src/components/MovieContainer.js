import React from 'react';
import { Card, Icon, Image, Container } from 'semantic-ui-react'

class MovieContainer extends React.Component {

  handleHeartClick = () => {
    fetch("http://localhost:4000/movies", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        ...this.props.movie, movie_id: this.props.movie.id
      })
    })
    .then(r => r.json())
    .then(newMovieObj => {
      this.props.addMovieToQueue(newMovieObj)
    })
  }

  render() {
    return(
      <Container textAlign='center'>
        <Card id="movie" className="ui centered card">
          <Image src="" wrapped ui={false} />
          <Card.Content>
            <Card.Header>{ this.props.movie.title }</Card.Header>
            <Card.Meta>Rating: { this.props.movie.popularity }</Card.Meta>
            <Card.Meta>Release Date: { this.props.movie.release_date }</Card.Meta>
            <Card.Description>
              { this.props.movie.overview }
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a alt="Back">
              <Icon onClick={ this.props.handleButtonClick } name='angle double left' />
            </a>
            <a alt="Add to queue">
              <Icon onClick={ this.handleHeartClick } name='heart' />
            </a>
          </Card.Content>
        </Card>
      </Container>
    )

  }


}

export default MovieContainer;
