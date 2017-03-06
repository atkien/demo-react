/**
 * PostFormContainers.js
 *
 * @description :: Post Form Container: A wrap-up middle-man to handle data fetching and mapping.
 * @docs        :: http://
 */
 
import { connect } from 'react-redux';
import { resetNewPost } from './PostActions';
import PostForm from './PostForm';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewPost());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newPost: state.posts.newPost
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
