/**
 * PostFormShow.js
 *
 * @description :: Post Form Show: A wrap-up to render parent container of `Post` form
 * @docs        :: http://
 */
 
import React, { Component } from 'react';
import PostFormContainer from './PostFormContainers';

class PostFormShow extends Component {
  render() {
    return (
      <div>
        <PostFormContainer />
      </div>
    );
  }
}


export default PostFormShow;
