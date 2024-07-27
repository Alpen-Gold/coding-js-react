import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { handleUserRegister } from "../api";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeRegister = (name, value) => {
    setRegisterValues({
      ...registerValues,
      [name]: value,
    });
    console.log(registerValues);
  };

  const submitRegister = async (event) => {
    if (registerValues.password !== registerValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await handleUserRegister(event, registerValues, dispatch, navigate);
  };

  return (
    <StyledContainer>
      <div className="inner-container">
        <input
          name="name"
          type="text"
          value={registerValues.name}
          onChange={(e) => changeRegister(e.target.name, e.target.value)}
          placeholder="Name"
        />
        <input
          name="email"
          type="email"
          value={registerValues.email}
          onChange={(e) => changeRegister(e.target.name, e.target.value)}
          placeholder="E-mail"
        />
        <input
          name="password"
          type="password"
          value={registerValues.password}
          onChange={(e) => changeRegister(e.target.name, e.target.value)}
          placeholder="Password"
        />
        <input
          name="confirmPassword"
          type="password"
          value={registerValues.confirmPassword}
          onChange={(e) => changeRegister(e.target.name, e.target.value)}
          placeholder="Confirm Password"
        />
        <button onClick={submitRegister}>Ro'yxatdan o'tish</button>
      </div>
    </StyledContainer>
  );
}

export default RegisterPage;

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
