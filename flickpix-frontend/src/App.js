import React from 'react';
import Home from './components/Home';

let api = `http://localhost:4000/movies`;

export default class app extends React.Component {
  state = {
    movies: [],
    users: [],
    queues: []
  }

  componentDidMount() {
    fetch(api)
    .then(r => r.json())
    .then(data => this.setState({
      movies: data.movies.results,
      users: data.users,
      queues: data.queues
    }))
  }

  render() {
    console.log(this.state)
    return (
      <Home />
    )
  }
}
