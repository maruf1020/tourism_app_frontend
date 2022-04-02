import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import User from "../models/user/User";
import UserService from "../service/UserService";
import { ClientEnum } from '../config/ClientEnum';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const notify = () => toast("Sign Up Successful. Please Log in");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }






  async function handleClick(e) {


    e.preventDefault();

    if (firstName === "") {
      alert("first name is mandatory")
      return;
    }

    if (lastName === "") {
      alert("last name is mandatory")
      return;
    }

    if (email === "" || password === "") {
      alert("fillup email and password")

      return;
    }


    if (password.length < 6) {
      alert("password must be atleast 6 characters long")

      return;
    }




    const user = new User(
      email,
      firstName,
      lastName,
      password,
    );
    console.log("why")

    const setAdminResponse = await UserService.instance.setUser(
      user,
      ClientEnum.INSERT
    );
    console.log("awhy")


    console.log(setAdminResponse.status)
    if (setAdminResponse.status === true) {

      localStorage.setItem('initial', 1);
      window.location.href = "/sign-in";

      return;


    }

    if (setAdminResponse.status === false)
      alert("Sign up failed")



  }

  const styles = {

    button: {
      width: 100,
      marginTop: 20,
      backgroundColor: "black",
      padding: 15,

    },
    btnText: {
      color: "white",
      fontSize: 20,
      justifyContent: "center",
      textAlign: "center",
    },
  };

  return (

    <div className=" App" >
      <div className="outer ">
        <div className="inner">
          <div className="Login">
            <h3>Sign up</h3>
            <ToastContainer />
            <Form onSubmit={handleSubmit}>


              <Form.Group size="lg" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control

                  placeholder="First name"
                  autoFocus
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>


              <Form.Group size="lg" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  autoFocus
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>


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
                  value={password || ''}
                  autoComplete="off"


                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>


              <Button style={styles.button} onClick={handleClick} disabled={!validateForm()}>
                Sign Up
              </Button>

            </Form>
            <p className="forgot-password text-right">
              Already Registered  <a href="/sign-in"> Log in?</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  );


}


