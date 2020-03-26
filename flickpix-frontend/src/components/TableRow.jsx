import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

class TableRow extends Component {

  state = {
    movie: {}
  }

  componentDidMount() {
    let queueMovie = this.props.backendMovies.find(movie => movie.id == this.props.queueObj.movie_id)
    fetch(`https://api.themoviedb.org/3/movie/${queueMovie.movie_id}?api_key=3d6fab529007c80701a5d4ed2a0df61e`)
      .then(r => r.json())
      .then(movieObj => this.setState({
        movie: {...movieObj}
      }))
  }

  handleSliderClick = () => {
    this.props.updateQueue(this.props.queueObj)
  }

  handleButtonClick = () => {
    this.props.deleteFromQueue(this.props.queueObj)
  }

  render() {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider onClick={ this.handleSliderClick} />
          </Table.Cell>
          <Table.Cell>{ this.state.movie.title }</Table.Cell>
          <Table.Cell>{ this.state.movie.vote_average }</Table.Cell>
          <Table.Cell>{ this.state.movie.release_date }</Table.Cell>
          <Table.Cell>{ this.state.movie.vote_average }</Table.Cell>
          <Table.Cell>
            <Button animated onClick={ this.handleButtonClick }>
              <Button.Content visible>Delete</Button.Content>
              <Button.Content hidden>
                <Icon name='trash alternate' />
              </Button.Content>
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }

}

export default TableRow;
