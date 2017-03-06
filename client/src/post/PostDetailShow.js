/**
 * PostDetailShow.js
 *
 * @description :: Post Detail Show: A wrap-up to render parent container of `Post Detail`
 * @docs        :: http://
 */
 
import React, { Component } from 'react';
import PostDetailContainer from './PostDetailContainers';

class PostDetailShow extends Component {

  render() {
    return (
      <div className='container'>
        <PostDetailContainer id={this.props.params.id} />
      </div>
    );
  }
}

export default PostDetailShow;
