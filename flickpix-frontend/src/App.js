import React from 'react';
import Home from './components/Home';

let api = `http://localhost:4000/movies`;

export default class app extends React.Component {
  state = {
    movies: [],
    queues: [],
    user: {
      id: 0,
      username: "",
      user_queues: []
    },
    token: ""
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:3000/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)
    }

    fetch(api)
    .then(r => r.json())
    .then(data => this.setState({
      movies: data.movies.results,
      users: data.users,
      queues: data.queues
    }))
  }

  handleResponse = (response) => {
    if (response.user) {
      localStorage.token = response.token
      this.setState({
        user: response.user,
        token: response.token
      }, () => {
        this.props.history.push("/profile")
      })
    } else {
      alert(response.error)
    }
  }

  render() {
    return (
      <Home movies={ this.state.movies }/>
    )
  }
}
