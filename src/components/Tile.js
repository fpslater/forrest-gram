import React from 'react';
import emoji from 'react-easy-emoji';

const Tile = (props) => (
  <div className='tile'>
    <a href={props.href} target='_blank'>
      <div className='tile-img'>
        <img src={props.src} />
      </div>
      <div className='tile-caption'>
        <div className='tile-likes'>
          {emoji('👍')}
          {props.likesCount}
        </div>
        <div className='tile-comments'>
          {emoji('💬')}
          {props.commentsCount}
        </div>
      </div>
    </a>
  </div>
);

export default Tile;