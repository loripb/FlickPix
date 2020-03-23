import React from 'react';
import { Card, Icon, Image, Container } from 'semantic-ui-react'

class MovieContainer extends React.Component {

  movieObj = this.props.movies[Math.floor(Math.random() * 19)]

  render() {
    return(
      <Container textAlign='center'>
        <Card id="movie" className="ui centered card">
          <Image src={this.movieObj.poster_path} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.movieObj.title}</Card.Header>
            <Card.Meta>Rating: {this.movieObj.popularity}</Card.Meta>
            <Card.Meta>Release Date: {this.movieObj.release_date}</Card.Meta>
            <Card.Description>
              {this.movieObj.overview}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon onClick={ this.props.handleButtonClick } name='angle double left' />
            </a>
          </Card.Content>
        </Card>
      </Container>
    )

  }


}

export default MovieContainer;
