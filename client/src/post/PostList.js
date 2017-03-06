/**
 * PostList.js
 *
 * @description :: Post List: renders HTML elements of `Post List`.
 * @docs        :: http://
 */
 
import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { Glyphicon, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

class PostList extends Component {

  constructor(props) {
    super(props);
    this.removePost = this.removePost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  // Making sure that the Component updating happens ONLY by the conditions
  shouldComponentUpdate(nextProps, nextState) {
    const { posts } = nextProps.postsList;
    return (posts && _.size(posts) > 0) ? true : false;
  }

  removePost() {

    const postId = this.props.postsList.posts[0].id;
    this.props.deletePost(postId);
    window.location.reload();

  }

  renderPosts(posts) {
    return posts.map((post) => {
      let createdDate = moment(new Date(post.createdAt)).format('MMM DD, YYYY HH:mm');
      return (
        <ListGroupItem key={post.id}>
	  <Link style={{color:'black'}} to={"posts/" + post.id + "/detail"}>
            <h3 className="list-group-item-heading">{post.title}</h3>
          </Link>
          <h5 className="list-group-item-heading">by {post.creator}</h5>
          <h5 className="list-group-item-heading created-date"><Glyphicon glyph='time' /> {createdDate}</h5>
        </ListGroupItem>
      )
    });
  }

  render() {
    const { posts, loading, error } = this.props.postsList;
    const postBlock = (_.size(posts) > 0) ? this.renderPosts(posts) : 'No posts found.';

    if(loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container bs-example">
        <Panel header="Latest Posts">
          <ListGroup>
            {postBlock}
          </ListGroup>
        </Panel>
      </div>
    );

  }

}

export default PostList;
