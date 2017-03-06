import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import PostIndex from './post/Index';
import PostDetailShow from './post/PostDetailShow';
import PostFormShow from './post/PostFormShow';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostIndex} />
    <Route path="posts" component={PostIndex} />
    <Route path="posts/:id/detail" component={PostDetailShow} />
    <Route path="posts/add" component={PostFormShow} />
  </Route>
);
