import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";

class Routine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };

    this.submit = () => {
      console.log('clicked')
      this.props.submitter(1);
      this.setState({submitted: true})
    };
  }

  render() {
    const {submitted} = this.state
    return (
      <Grid centered columns={1}>
        <Grid.Row>
          <Button onClick={() => this.submit()}>
          {submitted ? 'Submitted' : `Morning Complete`}
          </Button>

          <Button onClick={() => this.submit()}>
          {submitted ? 'Submitted' : `Night Complete`}
          </Button>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Routine