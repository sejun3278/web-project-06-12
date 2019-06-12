import React, { Component } from 'react';
import './App.css';
import { Grid } from '@material-ui/core'
import axios from 'axios';
// import addData from './addData.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrap : false,
    }
  }

componentDidMount() {
  this._addDate();
}

_addDate = async () => {
  const res = await axios.get('/get/data');

  if(res.data) {
    return sessionStorage.setItem('data', JSON.stringify(res.data));
  }
}

render() {
  const { scrap } = this.state;
  const data = JSON.parse(sessionStorage.getItem('data'))

  if(data === null) {
    return(
      <Grid className="App" id='loading_data'>
        <h4> 데이터를 불러오고 있습니다. </h4>
        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif' />
      </Grid>
    )
  } else {

  return (
    <Grid className="App">

      <Grid container={true} id='only_show_scrap'>
        <Grid item={true} xs={1}/>
        <Grid item={true}>
          <input type='checkbox' id='show_scrap_button' onChange={() => this.setState({ scrap : !scrap })}/>
          <span> </span>
            <label htmlFor='show_scrap_button' defaultChecked={scrap} id='scrap_notice'
                   style={ scrap ? { fontWeight : 'bold' } : null}
            > 
              스크랩한 것만 보기 
            </label>
        </Grid>
      </Grid>

    </Grid>
  );
  }
}

}

export default App;
