/**
 * PostForm.js
 *
 * @description :: Post Form: renders HTML input form of post.
 * @docs        :: http://
 */
 
import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Link } from 'react-router';
import FormFields from '../common/FormFields';
import TextAreaField from '../common/TextAreaField';
import { addPost, addPostSuccess, addPostFailure } from './PostActions';

function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = "Title cannot be empty.";
  }
  if (!values.creator || values.creator.trim() === '') {
    errors.creator = "Creator's name cannot be empty.";
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = "Post content  cannot be empty.";
  }

  return errors;
}

const validateAndCreatePost = (values, dispatch) => {
  // FIXME: This will be used when applying Token to API calls.	
  //return dispatch(addPost(values, sessionStorage.getItem('jwtToken')))
  return dispatch(addPost(values))
    .then(result => {
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(addPostFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      dispatch(addPostSuccess(result.payload.data));
    });
}

class PostForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {

    this.props.resetMe();

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.newPost.post && !nextProps.newPost.error) {
      this.context.router.push('/');
    }

  }

  renderError(newPost) {

    if (newPost && newPost.error && newPost.error.message) {
      return (
        <div className="alert alert-danger">
          { newPost ? newPost.error.message : '' }
        </div>
      );
    } else {
      return <span></span>
    }

  }

  render() {

    const {handleSubmit, submitting, newPost} = this.props;

    return (
      <div className='container'>
        { this.renderError(newPost) }
        <form onSubmit={ handleSubmit(validateAndCreatePost) }>
          <Field
            name="title"
            type="text"
            component={ FormFields }
            label="Title*"
            placeholder="Post title" />
          <Field
            name="creator"
            type="text"
            component={ FormFields }
            label="Creator*"
            placeholder="Your name" />
          <Field
            name="content"
            component={ TextAreaField }
            label="Content*"
            placeholder="Your writing here .." />
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={ submitting }>
              Submit
            </button>
            <Link
              to="/"
              className="btn btn-error"> Cancel
            </Link>
          </div>
        </form>
      </div>
    );

  }

}

export default reduxForm({ form: 'PostForm', validate })(PostForm)
