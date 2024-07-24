import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    props.setAdminActivated(true);
    localStorage.setItem("logged-form-massala-ja", "true");
    navigate("/");
  };

  const changeLogin = (name, value) => {
    if (name === "password") {
      setLoginPassword(value);
    } else if (name === "email") {
      setLoginEmail(value);
    }
  };

  const sabmitLogin = () => {
    if (loginPassword === "12345") {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        textAlign: "start",
        backgroundColor: "#EDEFF3",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            minWidth: "300px",
            backgroundColor: "white",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "50px",
            marginBottom: "30px",
            borderRadius: "6px",
            boxShadow: "0px 20px 25px 0px rgba(176, 177, 181, 0.43)",
          }}
        >
          <input
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => changeLogin(e.target.name, e.target.value)}
            placeholder="E-mail"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => changeLogin(e.target.name, e.target.value)}
            placeholder="Password:12345"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            className="btn-login"
            onClick={sabmitLogin}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Tizimga kirish
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
