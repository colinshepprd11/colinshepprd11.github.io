import React from "react";
import { connect } from "react-redux";
import { fetchData, submitStudySession, submitResults } from "../actions";
import { Grid, Button } from "semantic-ui-react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.less";
import Report from "./Report";
import Timer from "./Timer";
import Routine from "./Routine";
import Computation from "./games/Computation";
import Spatial from "./games/Spatial";
import RandomWords from "./games/RandomWords";
import PlaceHolder from "./games/PlaceHolder";

class HomeCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInProgress: false,
      allGamesComplete: false,
      currentIsDeskGame: false,
      roundsPlayed: 0,
      phoneGames: 0,
      deskGames: 0,
      startTime: undefined,
    };
    this.props.fetchData();
  }

  stopGame = () => {
    const { phoneGames, deskGames, startTime } = this.state;
    const totalGames = phoneGames + deskGames;

    if (totalGames >= 3) {
      const duration = Math.round((Date.now() - startTime) / 1000 / 60);
      this.props.submitResults({ rounds: 5, minutes: duration });
      this.setState({ gameInProgress: true, allGamesComplete: true });
    } else {
      this.setState({ gameInProgress: false, allGamesComplete: false });
    }
  };

  getGame(isDeskGame) {
    const { phoneGames, deskGames, startTime } = this.state;

    this.setState({
      startTime: startTime ? startTime : Date.now(),
      gameInProgress: true,
      currentIsDeskGame: isDeskGame,
      phoneGames: phoneGames + (!isDeskGame ? 1 : 0),
      deskGames: deskGames + (isDeskGame ? 1 : 0),
    });
  }


  placeHolders = [<div></div>, <div>done</div>];

  phoneGameComponents = [<Computation stopGame={this.stopGame} />];

  deskGameComponents = [
    <PlaceHolder stopGame={this.stopGame} name={"Journal"} />,
    <PlaceHolder stopGame={this.stopGame} name={"Prep Tasks"} />,
  ];

  render() {
    const {
      phoneGames,
      deskGames,
      gameInProgress,
      allGamesComplete,
      currentIsDeskGame,
    } = this.state;
    let currentDisplay;

    console.log(`phoneGames:${phoneGames} deskGames:${deskGames}`)
    if (allGamesComplete) {
      currentDisplay = this.placeHolders[1];
    } else if (gameInProgress) {
      currentDisplay = currentIsDeskGame
        ? this.deskGameComponents[deskGames - 1]
        : this.phoneGameComponents[phoneGames - 1];
    } else {
      currentDisplay = this.placeHolders[0];
    }

    return (
      <div>
        <Report data={this.props.data} />
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column>
              <Routine submitter={this.props.submitStudySession} />
            </Grid.Column>
            <Grid.Column>
              {currentDisplay}
              <Grid centered columns={1}>
                <Grid.Row>
                  {!gameInProgress && (
                    <Button onClick={() => this.getGame(false)}>
                      Start Phone {phoneGames}/{this.phoneGameComponents.length}
                    </Button>
                  )}
                  {!gameInProgress && (
                    <Button onClick={() => this.getGame(true)}>
                      Start Desk {deskGames}/{this.deskGameComponents.length}
                    </Button>
                  )}
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Timer submitter={this.props.submitStudySession} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps, {
  fetchData,
  submitStudySession,
  submitResults,
})(HomeCol);
