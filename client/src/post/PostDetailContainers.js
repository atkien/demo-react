/**
 * PostDetailContainers.js
 *
 * @description :: Post Detail Containers: A wrap-up middle-man to handle data fetching and mapping.
 * @docs        :: http://
 */
 
import { connect } from 'react-redux';
import { fetchPostDetail, fetchPostDetailSuccess, fetchPostDetailFailure, resetActivePost } from './PostActions';
import PostDetail from './PostDetail';

const mapStateToProps = (globalState, ownProps) => {
  return {
    postId: ownProps.id,
    activePost: globalState.posts.activePost
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetail: (id) => {
      dispatch(fetchPostDetail(id))
        .then((response) => {
          !response.error ? dispatch(fetchPostDetailSuccess(response.payload.data._rs)) : dispatch(fetchPostDetailFailure(response.payload.data));
        });
    },
    resetState: () => {
      dispatch(resetActivePost());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
