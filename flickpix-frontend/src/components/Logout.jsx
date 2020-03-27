import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

class Logout extends Component {
  state = {
    navigate: false
  };

  logout = () => {
    localStorage.clear('token');
    this.setState({ navigate: true })
    this.props.handleReRender()
  };

  render() {
    const { navigate } = this.state;

    if (navigate) {
      return <Redirect to="/" push={ true } />;
    }

    return <Menu.Item onClick={ this.logout }>
            <Icon name='log out' />
            Log Out
           </Menu.Item>
  }

}

export default Logout;
