import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome, SingleProduct } from './components';
import ProductListContainer from './containers/ProductListContainer';
import CartContainer from './containers/CartContainer';
import OrderHistoryContainer from './containers/OrderHistoryContainer';
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
          <Route onEnter={requireLogin}>
            <Route path="products" component={ProductListContainer} />
            <Route path="products/:id" component={SingleProduct} />
            <Route path="dashboard" />
            <Route path="cart" component={CartContainer}/>
            <Route path="orderHistory" component={OrderHistoryContainer}/>
          </Route>
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
        <IndexRedirect to="products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

    // <Route onEnter={requireLogin}>
    // <Route onEnter={requireLogin}>
    //       <Route path="home" component={UserHome} />
    //     </Route>
