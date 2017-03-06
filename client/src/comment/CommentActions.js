/**
 * CommentActions.js
 *
 * @description :: Comment Actions handles payloads which send from the app itself to the stores.
 * @docs        :: http://
 */
 
import axios from 'axios';

// Handle Comment Fetching
export const FETCH_COMMENT_DETAIL = 'FETCH_COMMENT_DETAIL';
export const FETCH_COMMENT_DETAIL_SUCCESS = 'FETCH_COMMENT_DETAIL_SUCCESS';
export const FETCH_COMMENT_DETAIL_FAILURE = 'FETCH_COMMENT_DETAIL_FAILURE';
export const RESET_ACTIVE_COMMENT = 'RESET_ACTIVE_COMMENT';

// Handle Comment Form
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';
export const RESET_NEW_COMMENT = 'RESET_NEW_COMMENT';

// FIXME: Lazy set-up the API URL here. Need to move to the global config
const API_URL = 'http://54.145.109.87:1337/api';

export function addComment(props, tokenFromStorage) {
  const request = axios({
    method: 'POST',
    data: props,
    url: `${API_URL}/comments/add`,
    headers: {
	  // FIXME: As the purpose of demonstration, this is not implemented. MUST BE SETUP for the real app.
      //'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_COMMENT,
    payload: request
  };
};

export function addCommentSuccess(newComment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: newComment
  };
};

export function addCommentFailure(error) {
  return {
    type: CREATE_COMMENT_FAILURE,
    payload: error
  };
};

export function resetNewComment() {
  return {
    type: RESET_NEW_COMMENT
  };
};
