import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }
  render() {
    const { validToken, user } = this.props.security;
    const userIsLoggedIn = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="nav-link ">
              <i className="fas fa-user-circle mr-1" /> {user.fullName}
            </div>
          </li>
          <li className="nav-item">
            <Link
              to="/logout"
              className="nav-link"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotLoggedIn = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/register" className="nav-link ">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    const headerLinks = validToken && user ? userIsLoggedIn : userIsNotLoggedIn;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  security: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
