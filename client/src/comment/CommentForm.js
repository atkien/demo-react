/**
 * CommentForm.js
 *
 * @description :: Comment Form: renders HTML input form of comment.
 * @docs        :: http://
 */
 
import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import _ from 'lodash';
import FormFields from '../common/FormFields';
import TextAreaField from '../common/TextAreaField';
import { addComment, addCommentSuccess, addCommentFailure } from './CommentActions';

function validate(values) {
  const errors = {};

  if (!values.commentor || values.commentor.trim() === '') {
    errors.commentor = "Please fill your name";
  }
  if (!values.comment || values.comment.trim() === '') {
    errors.comment = "Message cannot be empty.";
  }

  return errors;
}

const validateAndCreateComment = (values, dispatch, prevProps) => {

  values = _.assign(values, {pid:prevProps.postId});

  return dispatch(addComment(values))
    .then(result => {
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(addCommentFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      dispatch(addCommentSuccess(result.payload.data));
    });

}

class CommentForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {

    this.props.resetMe();

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.newComment.comment && !nextProps.newComment.error) {
      window.location.reload();
    }

  }

  renderError(newComment) {

    if (newComment && newComment.error && newComment.error.message) {
      return (
        <div className="alert alert-danger">
          { newComment ? newComment.error.message : '' }
        </div>
      );
    } else {
      return <span></span>
    }

  }

  render() {

    const { handleSubmit, submitting, newComment, postId } = this.props;

    return (
      <div className='comment-form-container'>
        { this.renderError(newComment) }
        <form onSubmit={ handleSubmit(validateAndCreateComment) }>
          <Field
            name="pid"
            type="hidden"
            component={ FormFields }
            val={postId} />
          <Field
            name="commentor"
            type="text"
            component={ FormFields }
            label="Name*"
            placeholder="Your name" />
          <Field
            name="comment"
            component={ TextAreaField }
            label="Message"
            placeholder="Reply to this post .." />
          <div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={ submitting }>
              Send message
            </button>
          </div>
        </form>
      </div>
    );

  }

}

export default reduxForm({ form: 'CommentForm', validate })(CommentForm)
