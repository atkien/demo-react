/**
 * PostDetail.js
 *
 * @description :: Post Detail: renders HTML elements of `Post Detail`.
 * @docs        :: http://
 */
 
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { Glyphicon, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import CommentFormContainer from '../comment/CommentFormContainers';

class PostDetail extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    this.props.resetState();
  }

  componentDidMount() {
    this.props.fetchPostDetail(this.props.postId);
  }

  renderComments(comments) {

    return comments.map((comment) => {
      const createdDate = moment(new Date(comment.createdAt)).format('MMM DD, YYYY HH:mm');
      return (
        <ListGroupItem className="comment-block" key={comment.id}>
          <Link style={{color:'black'}}>
            <h5 className="list-group-item-heading">{comment.content}</h5>
          </Link>
          <h6 className="list-group-item-heading comment-by">by {comment.commentor}</h6>
          <h5 className="list-group-item-heading created-date"><Glyphicon glyph='time' /> {createdDate}</h5>
        </ListGroupItem>
      )
    });

  }

  renderCommentHeader(comments) {
    const commentHeader = " Comments (" + _.size(comments) + ")";
    return (
      <span className="panel-comment-title">
        <Glyphicon glyph='comment' /> {commentHeader}
      </span>
    )
  };

  render() {
    const { post, loading, error } = this.props.activePost;

    if(loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!post) {
      return <span />
    }

    const commentBlock = (_.size(post.comments) > 0) ? this.renderComments(post.comments) : 'No comments found.';
    const postCreatedDate = moment(new Date(post.createdAt)).format('MMM DD, YYYY HH:mm');

    return (
      <div className="container bs-example">
        <Link
          to="/">&laquo; Back to Home
        </Link>
        <Panel header="">
          <h3 className="PostDetail-title">{post.title}</h3>
          <h6>by {post.creator}</h6>
          <h5 className="created-date"><Glyphicon glyph='time' /> {postCreatedDate}</h5>
          <p className="content">{post.content}</p>
        </Panel>
        <Panel className="panel-comment" header={this.renderCommentHeader(post.comments)}>
          <ListGroup>
            <CommentFormContainer postId={post.id} />
            {commentBlock}
          </ListGroup>
        </Panel>
      </div>
    );

  }

}

export default PostDetail;
