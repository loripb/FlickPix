import React from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom'
import VerticalSidebar from './VerticalSidebar';
import { Segment, Sidebar } from 'semantic-ui-react';
import MovieContainer from './MovieContainer';
import MovieButton from './MovieButton'

export default class Home extends React.Component {
  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
    showMovie: false,
  }

  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  handleDirectionChange = (direction) => () =>
    this.setState({ direction, visible: false })

  handleButtonClick = (e) => {
    console.log(this.state.showMovie, "HOME.js")
    this.setState({
      showMovie: !this.state.showMovie
    })
  }

  render() {
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'

    return (
      <div id="whole">

        <h1 className="ui orange center aligned header">
          FlickPix
        </h1>
        <i className="bars icon orange big" onClick={ this.handleAnimationChange('scale down') }></i>
        <Sidebar.Pushable as={ Segment }>
          {vertical ? null : (
            <VerticalSidebar
              animation={ animation }
              direction={ direction }
              visible={ visible }
            />
          )}

          <Sidebar.Pusher id="push" dimmed={ dimmed && visible }>
            {
              this.state.showMovie
              ?
              <MovieContainer handleButtonClick={ this.handleButtonClick } movies={ this.props.movies }/> 
              :
              <MovieButton handleButtonClick={ this.handleButtonClick } />
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
