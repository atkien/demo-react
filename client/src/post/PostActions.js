/**
 * PostActions.js
 *
 * @description :: Post Actions handles payloads which send from the app itself to the stores.
 * @docs        :: http://
 */
 
import axios from 'axios';

// Handle Post List
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL';
export const FETCH_POST_DETAIL_SUCCESS = 'FETCH_POST_DETAIL_SUCCESS';
export const FETCH_POST_DETAIL_FAILURE = 'FETCH_POST_DETAIL_FAILURE';
export const RESET_ACTIVE_POST = 'RESET_ACTIVE_POST';

// Handle Post Form
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const RESET_NEW_POST = 'RESET_NEW_POST';

//Validate post fields on the server
export const VALIDATE_POST_FIELDS = 'VALIDATE_POST_FIELDS';
export const VALIDATE_POST_FIELDS_SUCCESS = 'VALIDATE_POST_FIELDS_SUCCESS';
export const VALIDATE_POST_FIELDS_FAILURE = 'VALIDATE_POST_FIELDS_FAILURE';
export const RESET_POST_FIELDS = 'RESET_POST_FIELDS';

//Delete post
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const RESET_DELETED_POST = 'RESET_DELETED_POST';

const API_URL = 'http://54.145.109.87:1337/api';

export function fetchPosts(tokenFromStorage) {
  const request = axios({
    method: 'GET',
    url: `${API_URL}/posts`,
    headers: {
	  // FIXME: As the purpose of demonstration, this is not implemented. MUST BE SETUP for the real app.
      //'Authorization': `Bearer ${tokenFromStorage}`
	}
  });

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchPostsSuccess(posts) {

  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error
  };
}

export function fetchPostDetail(id) {
  const request = axios({
    method: 'GET',
    url: `${API_URL}/posts/${id}/detail`,
    headers: []
  });

  return {
    type: FETCH_POST_DETAIL,
    payload: request
  };
}

export function fetchPostDetailSuccess(activePost) {

  return {
    type: FETCH_POST_DETAIL_SUCCESS,
    payload: activePost
  };
};

export function fetchPostDetailFailure(error) {
  return {
    type: FETCH_POST_DETAIL_FAILURE,
    payload: error
  };
};

export function resetActivePost() {
  return {
    type: RESET_ACTIVE_POST
  };
};

export function addPost(props, tokenFromStorage) {
  const request = axios({
    method: 'POST',
    data: props,
    url: `${API_URL}/posts/add`,
    headers: {
	  // FIXME: As the purpose of demonstration, this is not implemented. MUST BE SETUP for the real app.	
      //'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_POST,
    payload: request
  };
};

export function addPostSuccess(newPost) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: newPost
  };
};

export function addPostFailure(error) {
  return {
    type: CREATE_POST_FAILURE,
    payload: error
  };
};

export function resetNewPost() {
  return {
    type: RESET_NEW_POST
  };
};

export function deletePost(id, tokenFromStorage) {

  const request = axios({
    method: 'DELETE',
    url: `${API_URL}/posts/delete/${id}`,
    headers: {
      //'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DELETE_POST,
    payload: request
  };

}

export function deletePostSuccess(deletedPost) {
  return {
    type: DELETE_POST_SUCCESS,
    payload: deletedPost
  };
}

export function deletePostFailure(response) {
  return {
    type: DELETE_POST_FAILURE,
    payload: response
  };
}