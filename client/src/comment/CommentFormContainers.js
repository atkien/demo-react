/**
 * CommentFormContainers.js
 *
 * @description :: Comment Form Containers: A wrap-up middle-man to handle data fetching and mapping.
 * @docs        :: http://
 */
 
import { connect } from 'react-redux';
import { resetNewComment } from './CommentActions';
import CommentForm from './CommentForm';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewComment());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    newComment: state.comments.newComment
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
