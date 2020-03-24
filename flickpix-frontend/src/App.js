import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import FormContainer from './components/FormContainer';

import { withRouter } from 'react-router-dom'

let api = `http://localhost:4000/movies`;

class App extends React.Component {
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
      fetch("http://localhost:4000/persist", {
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
        this.props.history.push("/")
    })
    } else {
      alert(response.error)
    }
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")
    console.log(userInfo, 'from login submit')

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
    console.log("Register form has been submitted")
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

  render() {
    console.log(this.state.user)
    return (
      <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/" exact render={() => <Home userName={this.state.user.username} movies={ this.state.movies } /> } />
          <Route render={ () => <p>Page not Found</p> } />
      </Switch>
    )
  }
}

export default withRouter(App)
