/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // Relationship
    comments: {
      collection: 'comments',
      via: 'post_ref'
    },

    title: { type: 'string' },

    creator: { type: 'string' },

    content: { type: 'string' }

  }
};

