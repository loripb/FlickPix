import PropTypes from 'prop-types';
import React from 'react';
import {Route, Switch, Link, NavLink} from 'react-router-dom'
import MovieContainer from './components/MovieContainer';
import VerticalSidebar from './components/VerticalSidebar';
import Home from './components/Home';
import {
  Segment,
  Sidebar,
} from 'semantic-ui-react';
let api = `http://localhost:4000/movies`;

export default class app extends React.Component {
  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
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

  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  handleDirectionChange = (direction) => () =>
    this.setState({ direction, visible: false })

  render() {
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
    console.log(this.state)

    return (
      <div>
        <h1 className="ui orange center aligned header">
          FlickPix
        </h1>
        <i className="bars icon" onClick={this.handleAnimationChange('scale down')}></i>

        <Sidebar.Pushable as={Segment}>
          {vertical ? null : (
            <VerticalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          )}

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Switch>
              <Route path="/" exact component={ Home } />
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
