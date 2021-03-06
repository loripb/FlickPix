import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import React from 'react';
import Logout from './Logout'
import {
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react';

const VerticalSidebar = ({ animation, direction, visible, handleClick, handleReRender }) => (

  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <div onClick={ handleClick }>
      <Menu.Item>
        <Icon name='home' />
        Home
      </Menu.Item>
    </div>
    <div onClick={ handleClick } className="queue-button">
      <Menu.Item>
        <Icon name='film' />
        Queue
      </Menu.Item>
    </div>
    <NavLink to='/login' exact activeClassName="selected">
      <Menu.Item>
        <Icon name='address card' />
        Log In
      </Menu.Item>
    </NavLink>
    <NavLink to='/register' exact activeClassName="selected">
      <Menu.Item>
        <Icon name='plus' />
          Register
      </Menu.Item>
    </NavLink>
    <div>
      <Logout handleReRender={ handleReRender } />
    </div>
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}


export default VerticalSidebar;
