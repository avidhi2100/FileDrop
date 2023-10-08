import React, {useState} from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import axios from "axios";

const SignUp = () => {
    const[userName, setUserName] = useState("");
    const[userFirstName, setUserFirstName] = useState("");
    const[userLastName, setUserLastName] = useState("");
    const[userEmail, setUserEmail] = useState("");
    const[userPassword, setUserPassword] = useState("");
    localStorage.setItem("userName", userName);
    async function register(event) {
        event.preventDefault();
        if(validateInputFields()) {
            try {
                await axios.post("http://localhost:8080/api/v1/user/signup", {
                    userName: userName,
                    firstName: userFirstName,
                    lastName: userLastName,
                    userEmail: userEmail,
                    userPassword: userPassword
                }).then((res) =>
                {
                    if(res.status === 201) {
                        navigate("/home");
                    } else if(res.status === 400) {
                        alert("User name or email id already exists");
                    } else {
                        alert("Error while registering");
                    }
                });
                navigate("/home");
            } catch(err) {
                alert(err);
            }
        }
    }
    function validateInputFields() {
        if(userName.length < 6 ) {
            alert('UserName less than 6 characters')
            return false;
        }
        if (userEmail.length === 0) {
            alert('Email Address can not be empty')
            return false;
        }

        if (userPassword.length < 8) {
            alert('Password must contain greater than or equal to 8 characters.')
            return false;
        }

        let countUpperCase = 0
        let countLowerCase = 0
        let countDigit = 0
        let countSpecialCharacters = 0
        for (let i = 0; i < userPassword.length; i++) {
            const specialChars = [
                '!',
                '@',
                '#',
                '$',
                '%',
                '^',
                '&',
                '*',
                '(',
                ')',
                '_',
                '-',
                '+',
                '=',
                '[',
                '{',
                ']',
                '}',
                ':',
                ';',
                '<',
                '>',
            ]

            if (specialChars.includes(userPassword[i])) {
                // this means that the character is special, so increment countSpecialCharacters
                countSpecialCharacters++
            } else if (!isNaN(userPassword[i] * 1)) {
                // this means that the character is a digit, so increment countDigit
                countDigit++
            } else {
                if (userPassword[i] === userPassword[i].toUpperCase()) {
                    // this means that the character is an upper case character, so increment countUpperCase
                    countUpperCase++
                }
                if (userPassword[i] === userPassword[i].toLowerCase()) {
                    // this means that the character is lowercase, so increment countUpperCase
                    countLowerCase++
                }
            }
        }

        if (countLowerCase === 0) {
            alert('0 lower case characters in password')
            return false;
        }

        if (countUpperCase === 0) {
            alert('Invalid Form, 0 upper case characters in password')
            return false;
        }

        if (countDigit === 0) {
            alert('Invalid Form, 0 digit characters in password')
            return false;
        }

        if (countSpecialCharacters === 0) {
            alert('Invalid Form, 0 special characters in password')
            return false;
        }
         return true

    }
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <p className="caccount">Create Account</p>
      <input type="text" placeholder="User name" value={userName} onChange={(event) => {
          setUserName(event.target.value);
      }}></input>
        <input type="text" placeholder="First Name" value={userFirstName} onChange={(event) => {
            setUserFirstName(event.target.value);
        }}></input>
        <input type="text" placeholder="Last Name" value={userLastName} onChange={(event) => {
            setUserLastName(event.target.value);
        }}></input>
      <input type="text" placeholder="Email" value={userEmail} onChange={(event) => {
          setUserEmail(event.target.value);
      }}></input>
      <input type="password" placeholder="Password" value={userPassword} onChange={(event) => {
          setUserPassword(event.target.value);
      }}></input>
      <button
        className="submit"
        onClick={register}>
        Sign In
      </button>
    </>
  );
};

export default SignUp;
