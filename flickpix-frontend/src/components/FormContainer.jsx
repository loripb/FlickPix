import React, { Component } from 'react';
import App from '../App'
import { NavLink } from 'react-router-dom'
import { Container, Button, Checkbox, Form } from 'semantic-ui-react'

class FormContainer extends Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
    console.log(this.state)
    return <App />
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let { formname } = this.props
    let { username, password } = this.state

    return (
      <div id="whole">

        <h1 className="ui orange center aligned header">
          FlickPix
        </h1>
        <Container textAlign='center'>
          <Form onSubmit={ this.handleSubmit }>
              <Form.Field>
                <label className="label-text" htmlFor="username">Username:</label>
                <input type="text" autoComplete="off" name="username" value={ username } onChange={ this.handleChange } />
              </Form.Field>
              <Form.Field>
                <label className="label-text" htmlFor="password" >Password:</label>
                <input type="password" autoComplete="off" name="password" value={ password } onChange={ this.handleChange } />
              </Form.Field>
              <Form.Field>
                <Checkbox label='Show password' />
              </Form.Field>
              <Button type="submit" >Submit</Button>
            </Form>
        </Container>
      </div>

    );
  }

}

export default FormContainer;
