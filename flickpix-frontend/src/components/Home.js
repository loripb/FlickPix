import React from 'react';
import {Route, Switch, Link, NavLink} from 'react-router-dom'
import MovieContainer from './MovieContainer';
import VerticalSidebar from './VerticalSidebar';
import {
  Segment,
  Sidebar,
} from 'semantic-ui-react';

export default class Home extends React.Component {
  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  }

  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  handleDirectionChange = (direction) => () =>
    this.setState({ direction, visible: false })

  render() {
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'

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
            <div className="ui container">
              <div className="ui text container">
                <button className="ui fluid red massive button">Get a random Movie!</button>
              </div>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
