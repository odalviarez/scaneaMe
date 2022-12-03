import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Navbar from "../../components/navBar/NavBar";
import Cookies from "universal-cookie";
export default function Register() {
  // initial state
  const [name, setName] = useState("");
  //const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  
  const [register, setRegister] = useState(false);
  const cookies = new Cookies();
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: process.env.REACT_APP_API+"/register" || "http://localhost:5000/register",
      data: {
        name,
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        })
        window.location.href = "/home";

        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
        console.log(error)
      });
  };
  
  return (
    <>
      <div>
        <Navbar />
      </div>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* firstName */}
        <Form.Group controlId="formBasicName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter First Name"
          />
        </Form.Group>
     
       
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
          Register
        </Button>

        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </Form>
    </>
  );

}














/*
import React, { PureComponent } from "react";
import "../login/Login.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startRegister } from "../../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import Navbar from "../../components/navBar/NavBar";

class Register extends PureComponent {
  constructor() {
    super();

    this.state = {
      firtsName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      adress: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  register = e => {
    e.preventDefault();
    const { firtsName, lastName, email, password, confirmPassword, adress } = this.state;
    this.setState({ firtsName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    console.log(firtsName, lastName, email, password, confirmPassword, adress);
    this.props.register(this.state);
  };

  render() {
    const { firtsName, lastName, email, password, confirmPassword, adress } = this.state;
    return (
    <>
      <div>
        <Navbar />
      </div>
      <form className="loginForm">
        {this.props.registered ? "Registered" : ""}
        {this.props.registering && !this.props.registered ? "Registering" : ""}
        <h1 className="heading">Create Account</h1>
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
            <FontAwesomeIcon className="inputicon" icon="key" />
            <input
              className="inputfield"
              type="firtsName"
              placeholder="Firtsname.."
              autoComplete="name"
              name="firtsName"
              value={firtsName}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="customInput">
            <FontAwesomeIcon className="inputicon" icon="key" />
            <input
              className="inputfield"
              type="lastName"
              placeholder="Lastname.."
              autoComplete="lastName"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="customInput">
            <FontAwesomeIcon className="inputicon" icon="envelope" />
            <input
              className="inputfield"
              type="email"
              placeholder="Email.."
              autoComplete="username"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="customInput">
            <FontAwesomeIcon className="inputicon" icon="envelope" />
            <input
              className="inputfield"
              type="adress"
              placeholder="Adress.."
              autoComplete="adress"
              name="adress"
              value={adress}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="customInput">
            <FontAwesomeIcon className="inputicon" icon="key" />
            <input
              className="inputfield"
              type="password"
              placeholder="Password.."
              autoComplete="new-password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="customInput">
            <FontAwesomeIcon className="inputicon" icon="key" />
            <input
              className="inputfield"
              type="password"
              placeholder="Confirm Password.."
              autoComplete="new-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
            />
          </div>
        </div>
       
        <div className="field submitfield">
          <input
            className="submit"
            type="submit"
            value="SIGN UP"
            onClick={this.register}
          />
        </div>
        <div className="field signupfield">
          <span className="linkfield">
            <Link to="/home">Already signed up? Login here</Link>
          </span>
        </div>
      </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    registered: state.registered,
    registering: state.registering
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: content => dispatch(startRegister(content))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
*/




/*
import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'

export default function Register() {
  return (
    <div>
      <NavBar />
      <h1>Register</h1>
    </div>
  )
}
*/
