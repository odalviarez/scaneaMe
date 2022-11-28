import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import Navbar from "../../components/navBar/NavBar";
const cookies = new Cookies();

export default function Login() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        // redirect user to the auth page
        window.location.href = "/home";

        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
    </>
  );
}





/*
import React, { PureComponent } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from '../../components/navBar/NavBar.jsx'

import { startLogin } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

class Login extends PureComponent {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  login = e => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
    this.props.login(this.state);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <>
      <div>
        <NavBar />
      </div>
      <form className="loginForm">
        {this.props.loggedIn ? "Logged in" : ""}
        {this.props.loginProcessing && !this.props.loggedIn ? "Logging.." : ""}
        <Link to="/home">Home</Link>
        <h1 className="heading">Sign in to Scanneme</h1>
        <div className="socialLogins">
          <button className="socialLogin">
            <FontAwesomeIcon icon={faFacebook} />
          </button>
          <button className="socialLogin">
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className="socialLogin">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </button>
        </div>
        <span className="standardText">Or use your email instead</span>
        <div className="field">
          <div className="customInput">
            <FontAwesomeIcon icon="envelope" className="inputicon" />
            <input
              className="inputfield"
              type="email"
              placeholder="Email.."
              autoComplete="username"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="customInput">
            <FontAwesomeIcon icon="key" className="inputicon" />
            <input
              className="inputfield"
              type="password"
              placeholder="Password.."
              autoComplete="current-password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <span className="linkfield">Forgot Password?</span>
        </div>
        <div className="field submitfield">
          <input
            className="submit"
            type="submit"
            value="SIGN IN"
            onClick={this.login}
          />
        </div>
        <div className="field signupfield">
          <span className="linkfield">
            <Link to="/register">New User? Sign up here</Link>
          </span>
        </div>
      </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    loginProcessing: state.loginProcessing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(startLogin(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
*/





/*
import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'

export default function Login() {
  return (
    <div>
      <NavBar />
      <h1>Login</h1>
    </div>
  )
}
*/