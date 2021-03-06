import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import FormContainer from './components/FormContainer';

import { withRouter } from 'react-router-dom'

class App extends React.Component {
  state = {
    backendMovies: [],
    movies: [],
    user: {
      id: 0,
      username: "",
      user_queues: []
    },
    token: "",
    // will use setState to trigger a re-render
    render: false
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:4000/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)
    }

    fetch("http://localhost:4000/api")
    .then(r => r.json())
    .then(data => this.setState({
      movies: data.results
    }))

    fetch("http://localhost:4000/movies")
    .then(r => r.json())
    .then(data => {
      this.setState({
        backendMovies: data
      })
    })
  }

  handleResponse = (response) => {
    if (response.user) {
      localStorage.token = response.token
      this.setState({
        user: response.user,
        token: response.token
      }, () => {
        this.props.history.push("/")
    })
    } else {
      alert(response.error)
    }
  }

  handleLoginSubmit = (userInfo) => {

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  handleRegisterSubmit = (userInfo) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <FormContainer formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <FormContainer formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  addMovieToQueue = (movieObj) => {
    fetch("http://localhost:4000/user_queues", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        movie_id: movieObj.id,
        user_id: this.state.user.id
      })
    })
    .then(r => r.json())
    .then(newMovieForQueue => {
      this.setState({
      user: {
        ...this.state.user,
        user_queues: [...this.state.user.user_queues, newMovieForQueue]
      },
      backendMovies: [...this.state.backendMovies, movieObj]
    })
    })
  }

  updateQueue = (queueObj) => {
    fetch(`http://localhost:4000/user_queues/${queueObj.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        ...queueObj,
        watched: !queueObj.watched
      })
    })
    .then(r => r.json())
    .then(queue_res => {
      let theUpdatedArray = this.state.user.user_queues.map((queue) => {
        if (queue.id === queueObj.id) {
          return {
            ...queue,
            watched: !queue.watched
          }
        } else {
          return queue
        }
      })

      this.setState({
        user: {
          ...this.state.user,
          user_queues: theUpdatedArray
        }
      })
    })

  }

  deleteFromQueue = (queueObj) => {
    let filteredQueue = this.state.user.user_queues.filter(queue => queue.id !== queueObj.id)
    this.setState({
      user: {
        ...this.state.user,
        user_queues: filteredQueue
      }
    })
    fetch(`http://localhost:4000/user_queues/${queueObj.id}`, {
      method: "DELETE"
    })

  }

  shuffle = () => {
    fetch("http://localhost:4000/api")
    .then(r => r.json())
    .then(data => this.setState({
      movies: data.results
    }))
  }

  handleReRender = () => {
    console.log(this.state.user);
    this.setState({
      render: true
    })

  }

  render() {
    return (
      <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/" exact render={() =>
              <Home
                userName={ this.state.user.username }
                movies={ this.state.movies }
                backendMovies={ this.state.backendMovies }
                addMovieToQueue={ this.addMovieToQueue }
                updateQueue={ this.updateQueue }
                userObj={ this.state.user }
                updateQueue={ this.updateQueue }
                deleteFromQueue={ this.deleteFromQueue }
                logout={ this.logout }
                shuffle={  this.shuffle }
                handleReRender={ this.handleReRender }
              />
            } />
          <Route render={ () => <p>Page not Found</p> } />
      </Switch>
    )
  }
}

export default withRouter(App)
