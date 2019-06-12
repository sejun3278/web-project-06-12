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
      update : false,
    }
  }

componentDidMount() {
  this._addDate();
  
  
  if(localStorage.getItem('scrap') === null) {
    localStorage.setItem('scrap', JSON.stringify([]))
  }
}

componentDidUpdate() {
  const { update } = this.state;

  if(update) {
    this.setState({ update : false })
  }
}

_addDate = async () => {
  const res = await axios.get('/get/data');

  if(res.data) {
    return sessionStorage.setItem('data', JSON.stringify(res.data));
  }
}

_addScrap(el) {
  let origin = JSON.parse(localStorage.getItem('scrap'));
  let check = origin.includes(el);
  this.setState({ update : true })

  if(!check) {
    origin.push(el);
    localStorage.setItem('scrap', JSON.stringify(origin))

  } else {
    let index = origin.indexOf(el);
    origin[index] = null;

    let cover = [];
    origin.forEach( (el) => {
      if(el !== null) {
        cover.push(el);
      }
    })
    localStorage.setItem('scrap', JSON.stringify(cover))
  }

  // const findClass = document.getElementsByClassName(el);
  // this.setState({ update : true })

  // if(findClass[0].classList.contains('on') === false) {
  //   findClass[0].classList.add('on')

  // } else {
  //   findClass[0].classList.remove('on')
  // }
}

render() {
  const { scrap } = this.state;
  const data = JSON.parse(sessionStorage.getItem('data'))
  const scrapArr = JSON.parse(localStorage.getItem('scrap'))

  if(data === null) {
    return(
      <Grid className="App" id='loading_data'>
        <h4> 데이터를 불러오고 있습니다. </h4>
        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif' />
      </Grid>
    )
  } else {

  return (
    <Grid>

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
      <br />
        <Grid container={true} id='show_pictures_cards'>
          <Grid item={true} xs={1} />

          <Grid item={true} xs={10} id='show_pictures_card_tool'>
            {data.map( (el, i) => {
              let check = scrapArr.includes(el.id);

              return(
                <Grid key={el.id}>
                  <img className='users_profile_image' src={el.profile_image_url}/>
                  <u className='users_nicknames'> {el.nickname} </u>

                  <Grid>
                    <img className='users_url_image' src={el.image_url}/>
                    <img className={'users_scrap_image ' + el.id}
                         onClick={() => this._addScrap(el.id)}
                          src={check ? require('./img/blue@2x.png') : require('./img/on-img@2x.png')}
                         //  src={() => this._checkScrap(el.id)}
                         />
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
          
          <Grid item={true} xs={1} />
        </Grid>
      </Grid>

    </Grid>
  );
  }
}

}

export default App;
