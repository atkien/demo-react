/**
 * commentReducerjs
 *
 * @description :: Comment Reducer: State handling.
 * @docs        :: http://
 */
 
import {
  FETCH_COMMENT_DETAIL, FETCH_COMMENT_DETAIL_SUCCESS, FETCH_COMMENT_DETAIL_FAILURE, RESET_ACTIVE_COMMENT,
  CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE, RESET_NEW_COMMENT
} from './CommentActions';

const INIT_STATE = {
  commentsList: { comments: [], error: null, loading: false },
  activeComment: { comment: null, error: null, loading: false },
  newComment: { comment: null, error: null, loading: false }
};

export default function(state = INIT_STATE, action = null) {
  let error;

  switch(action.type) {
    case FETCH_COMMENT_DETAIL:
      return Object.assign({}, state, { activeComment: { comment: [], loading: true } } );
    case FETCH_COMMENT_DETAIL_SUCCESS:
      return Object.assign({}, state, { activeComment: { comment: action.payload, error: null, loading: false } } );
    case FETCH_COMMENT_DETAIL_FAILURE:
      error = action.payload || { message: action.payload.message };
      return Object.assign({}, state, { activeComment: { comment: null, error: error, loading: false } } );
    case RESET_ACTIVE_COMMENT:
      return Object.assign({}, state, { activeComment: { comment: null, error: null, loading: false } } );
    case CREATE_COMMENT:
      return Object.assign({}, state, { newComment: { ...state.newComment, loading: true } } );
    case CREATE_COMMENT_SUCCESS:
      return Object.assign({}, state, { newComment: { comment: action.payload, error: null, loading: false } } );
    case CREATE_COMMENT_FAILURE:
      error = action.payload || { message: action.payload.message };
      return Object.assign({}, state, { newComment: { comment: null, error: error, loading: false } } );
    case RESET_NEW_COMMENT:
      return Object.assign({}, state, { newComment: { comment: null, error: null, loading: false } } );
    default:
      return state;
  }

}

