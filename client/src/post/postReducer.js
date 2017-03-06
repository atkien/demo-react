/**
 * postReducerjs
 *
 * @description :: Post Reducer: State handling.
 * @docs        :: http://
 */
 
import {
  FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE,
  FETCH_POST_DETAIL, FETCH_POST_DETAIL_SUCCESS, FETCH_POST_DETAIL_FAILURE, RESET_ACTIVE_POST,
  CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE, RESET_NEW_POST,
  DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, RESET_DELETED_POST
} from './PostActions';

const INIT_STATE = {
  postsList: { posts: [], error: null, loading: false },
  activePost: { post: null, error: null, loading: false },
  newPost: { post: null, error: null, loading: false }
};

export default function(state = INIT_STATE, action = null) {
  let error;

  switch(action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state, { postsList: { posts: [], error: null, loading: true } } );
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, { postsList: { posts: action.payload, error: null, loading: false } } );
    case FETCH_POSTS_FAILURE:
      error = action.payload || { message: action.payload.data._message };
      return Object.assign({}, state, { postsList: { posts: [], error: error, loading: false } } );
    case FETCH_POST_DETAIL:
      return Object.assign({}, state, { activePost: { post: [], loading: true } } );
    case FETCH_POST_DETAIL_SUCCESS:
      return Object.assign({}, state, { activePost: { post: action.payload, error: null, loading: false } } );
    case FETCH_POST_DETAIL_FAILURE:
      error = action.payload || {message: action.payload.message};
      return Object.assign({}, state, { activePost: { post: null, error: error, loading: false } } );
    case RESET_ACTIVE_POST:
      return Object.assign({}, state, { activePost: { post: null, error: null, loading: false } } );
    case CREATE_POST:
      return Object.assign({}, state, { newPost: { ...state.newPost, loading: true } } );
    case CREATE_POST_SUCCESS:
      return Object.assign({}, state, { newPost: { post: action.payload, error: null, loading: false } } );
    case CREATE_POST_FAILURE:
      error = action.payload || {message: action.payload.message};
      return Object.assign({}, state, { newPost: { post: null, error: error, loading: false } } );
    case RESET_NEW_POST:
      return Object.assign({}, state, { newPost: { post: null, error: null, loading: false } } );
    case DELETE_POST:
      return Object.assign({}, state, { deletedPost: { ...state.deletedPost, loading: true } } );
    case DELETE_POST_SUCCESS:
      return Object.assign({}, state, { deletedPost: { ...state.action.payload, error: null, loading: false } } );
    case DELETE_POST_FAILURE:
      error = action.payload || { message: action.payload.message };
      return Object.assign({}, state, { deletedPost: { post: null, error: error, loading: false } } );
    case RESET_DELETED_POST:
      return Object.assign({}, state, { deletedPost: { post: null, error: null, loading: false } } );
    default:
      return state;
  }

}

