import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import PostIndex from './components/post_index';
import PostNew from './components/post_new';
import PostShow from './components/post_show';
import PostEdit from './components/post_edit';


ReactDOM.render(
    <BrowserRouter>
      <div>
        <Switch>
        <Route path="/post/edit/:id" component={PostEdit} />
        <Route path="/post/new" component={PostNew} />
        <Route path="/post/:id" component={PostShow} />
        <Route path="/" component={PostIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  , document.querySelector('.container'));
