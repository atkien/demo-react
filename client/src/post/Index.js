/**
 * Index.js
 *
 * @description :: Index: The index component handles rendering HTML elements of `Post`.
 * @docs        :: http://
 */
 
import React, { Component } from 'react';
import PostList from './PostListContainers';

export default class Index extends Component {
  render() {
    return (
      <div>
        <PostList />
      </div>
    );
  }
}
