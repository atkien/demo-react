/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getAllPosts: function(request, response) {

    Posts.find().sort("createdAt DESC").exec(function(error, postsObj){

      if(error) {
        sails.log("[W_ERROR]: ", error);
        return response.status(500).json(
          {
            _error: 'Server 500 error.'
          }
        );
      }

      if(!postsObj || _.size(postsObj) == 0) {
        sails.log("[W_WARNING]: Could not find any posts.");
        return response.status(200).json(
          {
            _message: 'Could not find any posts.'
          }
        );
      }

      sails.log("[W_INFO]: Found %s posts", _.size(postsObj));
      return response.status(200).json(
        {
          _rs: postsObj
        }
      );

    });

  },

  getPostById: function(request, response) {

    var postId = request.param('pid');

    Posts.findOne({'id': postId})
      .populate('comments', { sort: 'createdAt DESC' }).exec(function(error, postObj) {

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
            _message: 'Could not get this post detail.'
          }
        );
      }

      sails.log("[W_INFO]: Post found");
      return response.status(200).json(
        {
          _message: 'Post found.',
          _rs: postObj
        }
      );

    });

  },

  createPost: function(request, response) {

    var params = request.params.all(),
        postParams = {
          title: params.title,
          creator: params.creator,
          content: params.content
        };

    Posts.create(postParams).exec(function(error, newPost){

      if(error) {
        sails.log("[W_ERROR]: ", error);
        return response.status(500).json(
          {
            _error: 'Server 500 error.'
          }
        );
      }

      sails.log("[W_INFO]: Save post successfully", newPost.id);
      return response.status(200).json(
        {
          _message: 'Create the post successfully.',
          _rs: (newPost) ? newPost.id : ''
        }
      );

    });

  },

  deletePost: function(request, response) {

    var postId = request.param('pid');


    async.waterfall([

      function (callback) {

        Posts.find({'id': postId})
          .populate('comments').exec(function(error, postObj) {

          if (error) { return callback(error); }

          if (!postObj) { return callback("W_NOT_EXIST", callback); }

          if(postObj[0].comments[0]) {
            postObj[0].comments.remove(postObj[0].comments[0].id);
            postObj[0].save();
            sails.log("[W_INFO]: Deleted comments of post with id=%s", postId);

            Comments.destroy({'id': postObj[0].comments[0].id}).exec(function (err) {

              if (err) {
                return callback(err);
              }

              sails.log("[W_INFO]: Deleted comment with id=%s", postObj[0].comments[0].id);
            });

            callback(null, "W_REMOVED_ASSOC");

          }
          else {
            callback(null, "W_NO_ASSOC");
          }

        });

      },

      function (msg, callback) {

        Posts.destroy({'id': postId}).exec(function (error) {

          if (error) { return callback(error); }

          sails.log("[W_INFO]: Deleted post with id=%s", postId);
        });

        callback(null, "W_REMOVED_ALL");

      }

    ], function (error, message) {

      if (error) {
        sails.log("[W_ERROR]: ", error);
        return response.status(500).json(
          {
            _error: 'Server 500 error.'
          }
        );
      }

      if(message == "W_NOT_EXIST") {
        sails.log("[W_WARNING]: Could not find the post with id=%s.", postId);
        return response.status(200).json(
          {
            _message: 'Could not get this post detail.'
          }
        );
      }

      if (message == "W_REMOVED_ALL") {
        return response.status(200).json(
          {
            _message: 'Deleted post successfully.'
          }
        );
      }

    });

  },

};

