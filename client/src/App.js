import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

const buttonsInstance = (
  <Button href="/posts/add" bsStyle="primary" bsSize="large" block>Create New Post</Button>
);

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Tech Blog</h2>
        </div>
        <div className="App-controller">
        {buttonsInstance}
        </div>
        {this.props.children}
      </div>
    );
  }
}
