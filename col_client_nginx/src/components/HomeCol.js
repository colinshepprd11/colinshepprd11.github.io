import React from "react";
import { connect } from "react-redux";
import { fetchData, submitStudySession, submitResults } from "../actions";
import { Grid, Button } from "semantic-ui-react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.less";
import Report from "./Report";
import Timer from "./Timer";
import Routine from "./Routine"
import Computation from "./games/Computation";
import Spatial from "./games/Spatial";
import RandomWords from "./games/RandomWords";
import PlaceHolder from "./games/PlaceHolder";

class HomeCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInProgress: false,
      roundsPlayed: 0,
      gameNumber: 0,
      gamesSeen: [],
      currentGame: 0,
      phoneGames: 0,
      deskGames: 0,
    };
    this.props.fetchData()
  }

  stopGame = () => {
    const { roundsPlayed } = this.state;
    if (roundsPlayed >= 4) {
      this.props.submitResults({ rounds: 5, minutes: 5 })
      this.setState({ gameInProgress: true, gameNumber: 1 })
    } else {
      this.setState({ gameInProgress: false, gameNumber: 0 })
    }
  }

  options = [
    <div></div>,
    <div>done</div>,
    <Computation stopGame={this.stopGame} />,
    <PlaceHolder stopGame={this.stopGame} name={'3 2 minute epics'} />,
    <PlaceHolder stopGame={this.stopGame} name={'Journal'} />,
    <PlaceHolder stopGame={this.stopGame} name={'Five One Pagers'} />,
  ];

  getGame(offset) {
    const { phoneGames, deskGames } = this.state;
    const isDeskGame = offset >= 4;
    let number = (isDeskGame ? deskGames : phoneGames) + offset;
    this.setState({
      gameInProgress: true,
      roundsPlayed: this.state.roundsPlayed + 1,
      gameNumber: number,
      phoneGames: phoneGames + (!isDeskGame ? 1 : 0),
      deskGames: deskGames + (isDeskGame ? 1 : 0)
    })

  }

  render() {
    const { gameNumber, phoneGames, deskGames, gameInProgress } = this.state
    return (
      <div>
        <Report data={this.props.data} />
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <Routine submitter={this.props.submitStudySession} />
            </Grid.Column>
            <Grid.Column>
              {this.options[gameNumber]}
              <Grid centered columns={1}>
                <Grid.Row>
                  {!gameInProgress && <Button onClick={() => this.getGame(2)}>Start Phone {phoneGames}/2</Button>}
                  {!gameInProgress && <Button onClick={() => this.getGame(4)}>Start Desk {deskGames}/2</Button>}
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Timer submitter={this.props.submitStudySession} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps, { fetchData, submitStudySession, submitResults })(HomeCol);
