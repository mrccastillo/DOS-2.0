import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../stylesheets/Login.css";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isInSignInPage, setIsInSignInPage] = useState(true);
  const [steps, setSteps] = useState(0);

  //controlled elements
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [section, setSection] = useState("");
  const [code, setCode] = useState("");

  function handleSignUpSubmit(e) {
    e.preventDefault();
    if (steps < 2) {
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
    }
  }

  function handleLogInSubmit(e) {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);
    console.log("LOGGED IN");
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
                    {!isInSignInPage && (
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
                      }}
                      placeholder="Enter your password"
                    />
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
                        />
                        <label htmlFor="remember-me">Remember Me</label>
                      </div>
                      <p>Forgot Password</p>
                    </>
                  )}
                </div>
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
