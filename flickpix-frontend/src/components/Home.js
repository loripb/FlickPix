import React from 'react';
import VerticalSidebar from './VerticalSidebar';
import { Segment, Sidebar } from 'semantic-ui-react';
import MovieContainer from './MovieContainer';
import MovieButton from './MovieButton';
import TableComponent from './TableComponent'

export default class Home extends React.Component {
  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
    showMovie: false,
    showQueue: false
  }

  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  handleDirectionChange = (direction) => () =>
    this.setState({ direction, visible: false })

  handleButtonClick = (e) => {
    this.setState({
      showMovie: !this.state.showMovie
    })
  }

  handleShowQueue = () => {
    this.setState({ showQueue: !this.state.showQueue })
    this.handleAnimationChange('uncover')
  }

  handleQueueClick = (animation) => {
    this.handleShowQueue()
    return this.setState((prevState) => ({ animation, visible: !prevState.visible }))
  }

  render() {
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'

    return (
      <div id="whole">
        <h1 className="ui orange center aligned header">
          FlickPix
        </h1>
        <i className="bars icon orange big" id="segment" onClick={ this.handleAnimationChange('uncover') }></i>
        <h2>Hello, {this.props.userName}</h2>

        <Sidebar.Pushable as={ Segment }>
          {vertical ? null : (
            <VerticalSidebar
              animation={ animation }
              direction={ direction }
              visible={ visible }
              handleClick={ this.handleQueueClick }
              handleAnimationChange={ this.handleAnimationChange }
            />
          )}

          <Sidebar.Pusher id="push" dimmed={ dimmed && visible }>
            {
              this.state.showQueue
              ?
              <TableComponent
                userObj={  this.props.userObj }
                updateQueue={ this.props.updateQueue }
                backendMovies={ this.props.backendMovies }
                deleteFromQueue={ this.props.deleteFromQueue }
              />
              :
              this.state.showMovie
              ?
              <MovieContainer
                updateQueue={ this.props.updateQueue }
                addMovieToQueue={ this.props.addMovieToQueue }
                handleButtonClick={ this.handleButtonClick }
                movie={ this.props.movies[Math.floor(Math.random() * 19)] }
                backendMovies={ this.props.backendMovies }
              />
              :
              <MovieButton handleButtonClick={ this.handleButtonClick } />
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
