import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome, SingleProduct } from './components';
import { me } from './reducer/user';

const whoAmI = store.dispatch(me());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/login');
      next();
    })
    .catch(err => console.log(err));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Main} />
        <Route path="products/:id" component={SingleProduct} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
    // <Route onEnter={requireLogin}>
    //       <Route path="home" component={UserHome} />
    //     </Route>
