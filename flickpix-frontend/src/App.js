import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import FormContainer from './components/FormContainer';

import { withRouter } from 'react-router-dom'

let api = `http://localhost:4000/api`;

class App extends React.Component {
  state = {
    movies: [],
    user: {
      id: 0,
      username: ""
    },
    token: ""
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

  addMovieToQueue = (id) => {
    fetch("http://localhost:4000/user_queues", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        movie_id: id,
        user_id: this.state.user.id
      })
    })
  }

  updateQueue = () => {
    console.log("hi");
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
                addMovieToQueue={ this.addMovieToQueue }
                updateQueue={ this.updateQueue }
              />
            } />
          <Route render={ () => <p>Page not Found</p> } />
      </Switch>
    )
  }
}

export default withRouter(App)
