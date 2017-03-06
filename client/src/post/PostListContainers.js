/**
 * PostListContainers.js
 *
 * @description :: Post List Containers: A wrap-up middle-man to handle data fetching and mapping.
 * @docs        :: http://
 */
 
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure,
  deletePost, deletePostFailure, deletePostSuccess } from './PostActions';import PostList from './PostList';

const mapStateToProps = (state) => {
  return {
    postsList: state.posts.postsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts())
        .then((response) => {
          !response.error ? dispatch(fetchPostsSuccess(response.payload.data._rs)) : dispatch(fetchPostsFailure(response.payload.data));
        });
    },
    deletePost: (id) => {
      dispatch(deletePost(id))
        .then((response) => {
          !response.error ? dispatch(deletePostSuccess(response.payload.data._rs)) : dispatch(deletePostFailure(response.payload.data));
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
