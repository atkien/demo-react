/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getCommentsByPostId: function(request, response) {

    var postId = request.param('pid');

    Comments.findOne({'post_ref': postId}).exec(function(error, commentsObj){

      if(error) {
        sails.log("[W_ERROR]: ", error);
        return response.status(500).json(
          {
            _error: 'Server 500 error.'
          }
        );
      }

      if(!commentsObj) {
        sails.log("[W_WARNING]: Could not find the comment with id=%s.", postId);
        return response.status(200).json(
          {
            _message: 'Could not get this post detail.'
          }
        );
      }

      sails.log("[W_INFO]: Comments found");
      return response.status(200).json(
        {
          _message: 'Comments found.',
          _rs: commentsObj
        }
      );

    });

  },

  createComment: function(request, response) {

    var params = request.params.all(),
        postId = params.pid,
        commentParams = {
          commentor: params.commentor,
          content: params.comment
        };

    Posts.findOne({'id': postId}).populate('comments').exec(function(error, postObj){

      if(error) {
        sails.log("[W_ERROR]: ", error);
        return response.status(500).json(
          {
            _error: 'Server 500 error.'
          }
        );
      }

      if(!postObj) {
        sails.log("[W_WARNING]: Could not find the post with id=%s.", postId);
        return response.status(200).json(
          {
            _message: 'Could not find the post.'
          }
        );
      }

      Comments.create(commentParams).exec(function(error, newComment){

        if(error) {
          sails.log("[W_ERROR]: ", error);
          return response.status(500).json(
            {
              _error: 'Server 500 error.'
            }
          );
        }

        postObj.comments.add(newComment.id);
        postObj.save();

        sails.log("[W_INFO]: Save comment successfully", newComment.id);
        return response.status(200).json(
          {
            _message: 'Comment submitted successfully.',
            _rs: (newComment) ? newComment.id : ''
          }
        );

      });

    });

  },

};

