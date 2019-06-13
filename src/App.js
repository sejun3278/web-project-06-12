import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core'
import axios from 'axios';
// import addData from './addData.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrap : false,
      update : false,
      allow : false,
      show : 8,
      loading : false,
    }
  }

  componentDidUpdate() {
    const { update, scrap, loading, show } = this.state;
    const scrapArr = JSON.parse(localStorage.getItem('scrap'))
  
    if(update) {
      this.setState({ update : false })
    }
  
    if(scrap) {
      if(scrapArr.length === 0) {
        this.setState({ scrap : false })
      }
    }

    if(loading) {
      this.setState({ loading : false, show : show + 4 })
    }
  }

componentDidMount() {
  window.addEventListener('scroll', this._handleScroll);
}

shouldComponentUpdate() {
  const { loading } = this.state;
  //example 특정컴포넌트의 최상단(top)이 스크롤하여 가려져서 안보이게 되면(top<0) 특정 액션 실행하는 메소드
  // const top = ReactDOM.findDOMNode(this).getBoundingClientRect().top;
  // console.log(top)

  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  console.log('스크롤위치 : ' + scrollTop)
  console.log('스크롤길이 : ' + scrollHeight)
  const clientHeight = document.documentElement.clientHeight;
  console.log('클라길이 : ' + clientHeight)

  let top = clientHeight + scrollTop;
  top = Math.ceil(top)

  // 스크롤바가 최하단까지 왔을 때 실행한다.
  if(top >= scrollHeight && loading === false) {
    this.setState({ loading : true })
  }
  // (top < 0) && 특정 액션 실행;
  return true;
}

_handleScroll = (e) => {
  const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
    this.setState({ scrollTop });
}

_addDate = async () => {
  const res = await axios.get('/get/data');

  if(res.data) {
    sessionStorage.setItem('data', JSON.stringify(res.data));

    setTimeout( () => {
      return window.location.reload();
    }, 800);
  }
}

_addScrap(e) {
  let origin = JSON.parse(localStorage.getItem('scrap'));
  let check = origin.includes(e.id);

  this.setState({ update : true })

  if(!check) {
    origin.push(e.id);
    localStorage.setItem('scrap', JSON.stringify(origin))

  } else {
    const result = origin.filter(el => el !== e.id);
    localStorage.setItem('scrap', JSON.stringify(result))
  }
}

_filterArr(data, arr) {
  if(arr.length === 0) {
    return data;
  }

  let cover = [];
  for(let i = 0; i < data.length; i++) {
    if(arr.includes(data[i].id)) {
      cover.push(data[i]);
    }
  }
  return cover;
}

render() {
  const { scrap, show } = this.state;
  if(sessionStorage.getItem('addShow') === null) {
    sessionStorage.setItem('addShow', 12);
  }
  sessionStorage.setItem('addShow', sessionStorage.getItem('addShow'));

  const data = JSON.parse(sessionStorage.getItem('data'))
  if(data === null) {
    this._addDate();
  }

  if(localStorage.getItem('scrap') === null) {
    localStorage.setItem('scrap', JSON.stringify([]))
  }

  const scrapArr = JSON.parse(localStorage.getItem('scrap'))

  let filter = data;
  if(scrap) {
    filter = this._filterArr(data, scrapArr);
  }

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
          <input type='checkbox' id='show_scrap_button' 
                 disabled={scrapArr.length !== 0 ? false : true}
                 checked={scrapArr.length && scrap}
                 onChange={() => this.setState({ scrap : !scrap })}/>
          <span> </span>
            <label htmlFor='show_scrap_button' defaultChecked={scrap} id='scrap_notice'
                   style={ scrap ? { fontWeight : 'bold' } : null}
                   style={ scrapArr.length !== 0 ? { color : 'black' } : { color : '#ababab' } }
            > 
              스크랩한 것만 보기 ({scrapArr.length})
            </label>
        </Grid>
      <br />
        <Grid container={true} id='show_pictures_cards'>
          <Grid item={true} xs={1} />

          <Grid item={true} xs={10} id='show_pictures_card_tool'>
            {filter.map( (el, i) => {
              let check = scrapArr.includes(el.id);
              
              if(i < show) {
                return(
                  <Grid key={el.id}>
                    <img className='users_profile_image' src={el.profile_image_url}/>
                    <u className='users_nicknames'> {el.nickname} </u>

                    <Grid>
                      <img className='users_url_image' src={el.image_url}/>
                      <img className={'users_scrap_image ' + el.id}
                          onClick={() => this._addScrap(el)}
                          // src={require('./img/on-img@2x.png')}
                            src={check ? require('./img/blue@2x.png') : require('./img/on-img@2x.png')}
                          //  src={() => this._checkScrap(el.id)}
                          />
                    </Grid>
                  </Grid>
                )
              }
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
