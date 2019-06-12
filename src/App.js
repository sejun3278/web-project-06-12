import React, { Component } from 'react';
import './App.css';
import { Grid } from '@material-ui/core'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrap : false,
    }
  }

render() {
  const { scrap } = this.state;

  return (
    <Grid className="App">

      <Grid container={true} id='only_show_scrap'>
        <Grid item={true} xs={1}/>
        <Grid item={true}>
          <input type='checkbox' id='show_scrap_button' onChange={() => this.setState({ scrap : !scrap })}/>
          <span> </span>
            <label htmlFor='show_scrap_button' defaultChecked={scrap} id='scrap_notice'> 스크랩한 것만 보기 </label>
        </Grid>
      </Grid>

    </Grid>
  );
  }
}

export default App;
