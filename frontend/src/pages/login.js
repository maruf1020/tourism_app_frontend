import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import AuthService from "../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {





  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLogin, setUserLogin] = React.useState(true);
  const [logInHeader, setLoginHeader] = React.useState("User Log In");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const notifyMail = () => toast("fillup email and password ");
  const notifyIni = () => toast("Sign Up Successful. Please Log in");


  const notify = () => toast("Incorrect email or password")

  function handleSubmit(event) {
    event.preventDefault();
  }
  if (localStorage.getItem('initial') == 1) {
    localStorage.setItem('initial', 0)
    notifyIni()
  }


  async function handleClick(e) {
    if (email === "" || password === "") {
      notifyMail();

      return;
    }

    if (isUserLogin) {
      localStorage.setItem('type', "user");
      localStorage.setItem('id', email);

      e.preventDefault();
      const loginUserResponse = await AuthService.instance.userLogin(email, password)

      if (loginUserResponse.status === true) {
        console.log(loginUserResponse.user.firstName)

        window.location.href = "/userMainPage";
        return;

      }

      if (loginUserResponse.status === false) {
        notify();
      }

    } else {
      localStorage.setItem('type', "admin");
      e.preventDefault();
      const loginAdminResponse = await AuthService.instance.adminLogin(email, password)

      if (loginAdminResponse.status === true) {
        window.location.href = "/adminMainPage";
        return;

      }

      if (loginAdminResponse.status === false) {

        notify();
      }

    }
  }

  const [buttonText, setButtonText] = useState("log in as user"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState

  const changeText = () => {
    if (isUserLogin) {

      setUserLogin(false);
      setLoginHeader("Admin Log In");
      setButtonText("log in as user");
    } else if (!isUserLogin) {

      setUserLogin(true);
      setLoginHeader("User Log In");
      setButtonText("log in as admin");
    }
  };

  return (
    <div className=" App">
      <ToastContainer />
      <div className="outer ">
        <div className="inner">
          <div className="Login">
            <h3>{logInHeader}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className="btn btn-dark btn-lg btn-block"
                onClick={handleClick}
                disabled={!validateForm()}
              >
                Login
              </Button>
            </Form>
            <p className="forgot-password text-right">
              Do not have an account? <a href="/sign-up"> Register</a>
            </p>
            <div className="text-center">
              <p className="px50"> </p>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => changeText()}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
