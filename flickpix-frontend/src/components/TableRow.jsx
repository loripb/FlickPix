import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

class TableRow extends Component {

  state = {
    movie: {}
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.queueObj.movie_id}?api_key=3d6fab529007c80701a5d4ed2a0df61e`)
      .then(r => r.json())
      .then(movieObj => this.setState({
        movie: {...movieObj}
      }))
  }

  render() {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>{ this.state.movie.title }</Table.Cell>
          <Table.Cell>{ this.state.movie.vote_average }</Table.Cell>
          <Table.Cell>{ this.state.movie.release_date }</Table.Cell>
          <Table.Cell>{ this.state.movie.vote_average }</Table.Cell>
          <Table.Cell>
            <button class="ui icon button">delete<i aria-hidden="true" class="trash alternate"></i></button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }

}

export default TableRow;
