import React from 'react';
import { Card, Icon, Image, Container } from 'semantic-ui-react'

class MovieContainer extends React.Component {

  movieObj = this.props.movies[Math.floor(Math.random() * 19)]

  handleHeartClick = (movieObj) => {

    fetch("http://localhost:4000/movies", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        ...movieObj, movie_id: movieObj.id
      })
    })
    .then(r => r.json())
    .then(newMovieObj => this.props.addMovieToQueue(newMovieObj.id))
  }

  render() {
    return(
      <Container textAlign='center'>
        <Card id="movie" className="ui centered card">
          <Image src="" wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.movieObj.title}</Card.Header>
            <Card.Meta>Rating: {this.movieObj.popularity}</Card.Meta>
            <Card.Meta>Release Date: {this.movieObj.release_date}</Card.Meta>
            <Card.Description>
              {this.movieObj.overview}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a alt="Back">
              <Icon onClick={ this.props.handleButtonClick } name='angle double left' />
            </a>
            <a alt="Add to queue">
              <Icon onClick={ this.handleHeartClick(this.movieObj) } name='heart' />
            </a>
          </Card.Content>
        </Card>
      </Container>
    )

  }


}

export default MovieContainer;
