import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Navbar extends React.Component {

  render(){
    return (
      <div className="row">
          <nav className="navbar navbar-inverse" role="navigation">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">Pokeshoppe</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                      <li>
                        <Link to="login">Login</Link>
                      </li>
                      <li>
                        <Link to="signup">SignUp</Link>
                      </li>
                      <li>
                          <Link to="cart">Cart</Link>
                      </li>
                      <li>
                        <Link to="orderHistory">Past Orders</Link>
                      </li>
                      {this.props.user.type === 'ADMIN' && <li><Link to="dashboard">Admin Dashboard</Link></li>}
                  </ul>
              </div>
          </nav>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user
});

export default connect(mapState)(Navbar);
