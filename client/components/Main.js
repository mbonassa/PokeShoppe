import React from 'react';
import store from '../store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import Navbar from './Navbar';

import {} from '../action-creators/'

const mapState = (state, ownProps) => {
  return Object.assign({}, state)
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

// Component //

export default class Main extends React.Component {
  constructor () {
    super();
    this.state = 
  }
  //const { children, handleClick, loggedIn } = props;

  return (
    <div>
    <Navbar />
      { props.children }
    </div>
  );
};

// Main.propTypes = {
//   children: PropTypes.object,
//   handleClick: PropTypes.func.isRequired,
//   loggedIn: PropTypes.bool.isRequired
// };

// // Container //

// const mapState = ({ user }) => ({
//   loggedIn: !!user.id
// });

// const mapDispatch = dispatch => ({
//   handleClick () {
//     dispatch(logout());
//   }
// });

// export default connect(mapState, mapDispatch)(Main);
