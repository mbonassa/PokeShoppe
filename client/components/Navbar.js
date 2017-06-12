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
                  <a className="navbar-brand" href="#">Start Bootstrap</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                      <li>
                          <a href="#">About</a>
                      </li>
                      <li>
                          <a href="#">Services</a>
                      </li>
                      <li>
                          <a href="#">Contact</a>
                      </li>
                      {this.props.user.type === 'ADMIN' && <li><Link to="dashboard">Admin Dashboard</Link></li>}
                  </ul>
                  <form className="navbar-form navbar-left">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
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
