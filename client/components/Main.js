import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import Navbar from './Navbar';


// Component //

const Main = props => {
  console.log(props.children)
  //const { children, handleClick, loggedIn } = props;

  return (
    <div >
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
export default Main
// export default connect(mapState, mapDispatch)(Main);
