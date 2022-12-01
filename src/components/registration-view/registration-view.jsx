import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 5) {
      setPassword("Password must be 5 characters long");
      isReq = false;
    }

    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmail("Please enter a  valid email address");
      isReq = false;
    }

    return isReq;
  };

  // assign variable isReq to validate function
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://marcey-flix-movie-app.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration Successful, please login!");

          window.open("/", "_self"); // _self is required so that the page will open in the current tab
        })
        // .catch((response) => {
        //   console.error(response);
        //   alert("unable to register");
        .catch((e) => {
          console.log("error registering user");
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>Sign Up</Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label> Username: </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a Username"
                    />

                    {usernameErr && <p> {usernameErr} </p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label> Password: </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="5"
                      placeholder="Your Password must be 5 characters or more"
                    />

                    {passwordErr && <p> {passwordErr} </p>}
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="marcella@gmail.com"
                    />

                    {emailErr && <p> {emailErr} </p>}
                  </Form.Group>

                  <Form.Group controlId="formBirthday">
                    <Form.Label> Birthday: </Form.Label>
                    <Form.Control
                      type="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                  <p></p>
                  <p>
                    Already registered <Link to={"/"}>Sign in</Link> here
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
