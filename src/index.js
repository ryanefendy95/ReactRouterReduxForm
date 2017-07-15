import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import promise from 'redux-promise';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
          <div>
              <Switch>
                  <Route path={'/posts/new'} render={({ history }) => {return <PostsNew history={history}/>}}/>
                  {/*<Route path={'/posts/:id'} render={() => {return <PostsShow />}}/>*/}
                  <Route path={'/posts/:id'} component={PostsShow}/>
                  <Route exact path={'/'} render={() => {return <PostsIndex />}}/>
              </Switch>
          </div>
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
