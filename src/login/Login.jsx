import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { handleUserLogin } from "../api";

function LoginPage() {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.allData);
  const dispatch = useDispatch();
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  // React.useEffect(() => {
  //   getUserOnLoad(dispatch);
  // }, [dispatch]);

  const handleLogin = () => {
    props.setAdminActivated(true);
    localStorage.setItem("logged-form-massala-ja", "true");
    navigate("/");
  };

  const changeLogin = (name, value) => {
    setLoginValues({
      ...loginValues,
      [name]: value,
    });

    console.log(loginValues);
  };

  const sabmitLogin = async (event) => {
    await handleUserLogin(event, loginValues, dispatch, navigate);
  };

  return (
    <StyledContainer>
      <div className="inner-container">
        <input
          name="email"
          type="email"
          value={loginValues.email}
          onChange={(e) => changeLogin(e.target.name, e.target.value)}
          placeholder="E-mail"
        />
        <input
          name="password"
          type="password"
          value={loginValues.password}
          onChange={(e) => changeLogin(e.target.name, e.target.value)}
          placeholder="Password:12345"
        />

        <button
          className="text-black"
          onClick={() => {
            navigate("/register");
          }}
        >
          I do not have account !
        </button>
        <button onClick={sabmitLogin}>Tizimga kirish</button>
      </div>
    </StyledContainer>
  );
}

export default LoginPage;

// Styled Components
const StyledContainer = styled.div`
  text-align: start;
  background-color: #edeff3;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .inner-container {
    text-align: center;
    min-width: 300px;
    background-color: white;
    padding: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 30px;
    border-radius: 6px;
    box-shadow: 0px 20px 25px 0px rgba(176, 177, 181, 0.43);
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
`;
