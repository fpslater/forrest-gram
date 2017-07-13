import React, { Component } from 'react';
import $ from "jquery";
import Tile from './../components/Tile';

const accessToken = '1122988832.6b529d8.642d84539271425eb7108e56227f260e';
const baseUrl = 'https://api.instagram.com/v1/users/self/media/recent/';
const tileBatchSize = 12;

class TileLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      index: 1,
      maxId: '',
      clicked: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.generateTiles();
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.state.clicked) {
      return;
    }

    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight && this.state.tiles.length < 20) {
      this.setState({ index: this.state.index + 1 })
      this.generateTiles();
    }
  }

  handleClick() {
    this.setState({ clicked: true });
    this.generateTiles();
  }

  generateTiles() {
    const url = baseUrl+'?access_token='+accessToken+'&count='+tileBatchSize+'&max_id='+this.state.maxId;
    const params = {
      url: url,
      dataType: 'jsonp',
      type: 'GET',
      success: (response) => {
         this.setState({tiles: this.state.tiles.concat(response.data)})
         this.setState({maxId: response.pagination.next_max_id})
      },
      error: (error) => {
        alert('API BROKEN', error);
      }
    }
    $.ajax(params);
  }

  render() {

    const creatTile = (obj, i) => {
      return (
        <Tile 
          key={i}
          href={obj.link}
          src={obj.images.standard_resolution.url}
          commentsCount={obj.comments.count}
          likesCount={obj.likes.count}
        />
      );
    }

    const tiles = this.state.tiles.map(creatTile);

    return (
      <div>
        <div className='tiles'>
          {tiles}
        </div>
        {(!this.state.clicked && tiles.length > 0) &&
          <button
            className='load-more-button'
            onClick={this.handleClick}>
            Load more
          </button>
        }
      </div>
    );
  }
}

export default TileLayout;
