import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../stylesheets/Login.css";
import axios from "axios";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInSignInPage, setIsInSignInPage] = useState(true);
  const [steps, setSteps] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  //controlled elements
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [section, setSection] = useState("");
  const [code, setCode] = useState("");

  function handleSignUpSubmit(e) {
    e.preventDefault();
    if (steps < 2) {
      console.log(steps);
      setErrorMsg("");
      //don't proceed to next step when form is not filled out
      if (steps === 0 && (!email || !username || password !== confirmPass)) {
        if (password !== confirmPass)
          setErrorMsg("Please confirm your password");
        else setErrorMsg("Please fill out the fields");
        return;
      }
      if (steps === 1 && (!firstName || !lastName || !section)) {
        setErrorMsg("Please fill out the fields");
        return;
      }
      if (steps >= 2 && !code) {
        setErrorMsg("Please fill out the fields");
        return;
      }
      setSteps((prevStep) => prevStep + 1);
    } else {
      //dito
      console.log("email: ", email);
      console.log("username: ", username);
      console.log("password: ", password);
      console.log("firstName: ", firstName);
      console.log("lastName: ", lastName);
      console.log("section: ", section);
      console.log("code: ", code);
      console.log("ACCOUNT CREATED!");
      setSteps(0);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPass("");
      setFisrtName("");
      setLastName("");
      setSection("");
      setCode("");
      setErrorMsg("");
    }
  }

  async function handleLogInSubmit(e) {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      setErrorMsg("Please fill out the fields");
      return;
    }

    const user = {
      emailOrUsername: usernameOrEmail,
      password: password,
    };

    try {
      const res = await axios.post(
        "https://backend.dosshs.online/api/auth/login",
        user
      );
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      return setErrorMsg(err.response.data.message);
      // console.log(err.response.data.message);
    }
    setUsernameOrEmail("");
    setPassword("");
    setIsRememberMe();
    setErrorMsg("");
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="login-background">
        <div className="login-page" style={{ position: "relative" }}>
          <div
            className="login-form-container"
            style={{
              left: isInSignInPage /* && isInDesktop*/ ? 0 : "100%",
              transform: !isInSignInPage && "translateX(-100%)",
              position: "absolute",
              transition: "300ms ease-out ",
            }}
          >
            <form className="login-form">
              <div className="form-fields-container">
                <h1 className="form-header">
                  {isInSignInPage ? "Hello World!" : "Create Account"}
                </h1>
                <p className="form-subheader">
                  {" "}
                  {isInSignInPage
                    ? "Sign into your DOS Account"
                    : "Join DOS Now!"}
                </p>
                {steps === 0 ? (
                  <>
                    {isInSignInPage && (
                      <input
                        type="text"
                        className="login-input --white-btn"
                        style={{
                          borderColor: "#4f709c",
                          backgroundColor: "white",
                          color: "#000",
                        }}
                        value={usernameOrEmail}
                        onChange={(e) => {
                          setUsernameOrEmail(e.target.value);
                        }}
                        placeholder="Enter your username or email "
                      />
                    )}
                    {!isInSignInPage && (
                      <>
                        <input
                          type="text"
                          className="login-input --white-btn"
                          style={{
                            borderColor: "#4f709c",
                            backgroundColor: "white",
                            color: "#000",
                          }}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          placeholder="Enter your email "
                        />
                        <input
                          type="text"
                          className="login-input --white-btn"
                          style={{
                            borderColor: "#4f709c",
                            backgroundColor: "white",
                            color: "#000",
                          }}
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          placeholder="Enter your username  "
                        />
                      </>
                    )}
                    <input
                      type="password"
                      className="login-input --white-btn"
                      style={{
                        borderColor: "#4f709c",
                        backgroundColor: "white",
                        color: "#000",
                      }}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (!isInSignInPage) {
                          if (e.target.value != confirmPass)
                            setErrorMsg("Password didn't match");
                          else setErrorMsg("");
                        }
                      }}
                      placeholder="Enter your password"
                    />
                    {!isInSignInPage && (
                      <input
                        type="text"
                        className="login-input --white-btn"
                        style={{
                          borderColor: "#4f709c",
                          backgroundColor: "white",
                          color: "#000",
                        }}
                        value={confirmPass}
                        onChange={(e) => {
                          setConfirmPass(e.target.value);
                          if (e.target.value != password)
                            setErrorMsg("Password didn't match");
                          else setErrorMsg("");
                        }}
                        placeholder="Confirm Password  "
                      />
                    )}
                  </>
                ) : steps === 1 ? (
                  <>
                    <input
                      type="text"
                      className="login-input --white-btn"
                      style={{
                        borderColor: "#4f709c",
                        backgroundColor: "white",
                        color: "#000",
                      }}
                      value={firstName}
                      onChange={(e) => {
                        setFisrtName(e.target.value);
                      }}
                      placeholder="First Name"
                    />
                    {!isInSignInPage && (
                      <input
                        type="text"
                        className="login-input --white-btn"
                        style={{
                          borderColor: "#4f709c",
                          backgroundColor: "white",
                          color: "#000",
                        }}
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        placeholder="Last Name"
                      />
                    )}
                    <input
                      type="text"
                      className="login-input --white-btn"
                      style={{
                        borderColor: "#4f709c",
                        backgroundColor: "white",
                        color: "#000",
                      }}
                      value={section}
                      onChange={(e) => {
                        setSection(e.target.value);
                      }}
                      placeholder="Section"
                    />
                  </>
                ) : (
                  steps >= 2 && (
                    <>
                      <p className="signin-text">
                        Enter the code sent to example@gmail.com
                        <br />
                        to finalize your account.
                      </p>
                      <input
                        type="text"
                        className="login-input --white-btn"
                        style={{
                          borderColor: "#4f709c",
                          backgroundColor: "white",
                          color: "#000",
                        }}
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        placeholder="Code"
                      />
                    </>
                  )
                )}

                <div className="utils-container">
                  {isInSignInPage && (
                    <>
                      <div>
                        <input
                          type="checkbox"
                          name="isRememberMe"
                          id="remember-me"
                          value={isRememberMe}
                          onChange={(e) => {
                            setIsRememberMe(e.target.checked);
                          }}
                        />
                        <label htmlFor="remember-me">Remember Me</label>
                      </div>
                      <p>Forgot Password</p>
                    </>
                  )}
                </div>
                <p className="--server-msg">{errorMsg}</p>
              </div>
              {isInSignInPage ? (
                <button className="--blue-btn" onClick={handleLogInSubmit}>
                  SIGN IN
                </button>
              ) : (
                <button className="--blue-btn" onClick={handleSignUpSubmit}>
                  {steps >= 2 ? "SIGN UP" : "NEXT"}
                </button>
              )}
            </form>
          </div>
          <div
            className="login-message-container"
            style={{
              right: isInSignInPage ? 0 : "100%",
              transform: !isInSignInPage && "translateX(100%)",
              position: "absolute",
              transition: "300ms ease-out",
            }}
          >
            <div className="message-container">
              <h2 className="message-header">
                {isInSignInPage ? "Welcome Back!" : "Welcome to DOS"}
              </h2>
              <p className="message-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate quibusdam quas commodi dolores molestias dignissimos
                laudantium. Et iste quae sapiente facere. Earum libero placeat
                quidem officia iste doloribus vero sequi! Quibusdam atque
                expedita, non fuga, illo tempore minus corrupti sequi voluptatem
                consequatur tempora exercitationem cum consectetur repudiandae,
                facere pariatur recusandae earum corporis debitis sint sunt
                numquam. Eligendi officiis quam debitis.
              </p>
            </div>
            <div className="not-signedin-container">
              <p className="not-signedin-container-label">
                {isInSignInPage && " Not yet joined with DOS?"}
              </p>
              <button
                className="--white-btn"
                onClick={() => {
                  setIsInSignInPage(!isInSignInPage);
                  setSteps(0);
                  setEmail("");
                  setUsername("");
                  setPassword("");
                  setFisrtName("");
                  setLastName("");
                  setSection("");
                  setCode("");
                  setErrorMsg("");
                }}
              >
                {isInSignInPage
                  ? " Create an account"
                  : "Already have an account?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
