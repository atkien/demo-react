import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-react-router';
import PostReducer from './post/postReducer';
import CommentReducer from './comment/commentReducer';

var formReducer = require('redux-form').reducer;

const rootReducer = combineReducers({
  form: formReducer,
  router: routerStateReducer,
  posts: PostReducer,
  comments: CommentReducer
});

export default rootReducer;
