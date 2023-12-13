import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import TokenContext from "../context/TokenContext";
import Loading from "./Loading";

export default function SignIn() {
  return (
    <>
      <p>SignIn</p>
    </>
  );
}
const Conteiner = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  ion-icon {
    position: absolute;
    top: 10;
    left: 15;
    font-size: 35px;
    color: #ff8d3e;
    filter: drop-shadow(1px 2px 1px #4c2a12);
  }
  img {
    width: 300px;
  }
`;

export const ButtonRegisterLogin = styled.button`
  border: none;
  color: #ffffff;
  margin-top: 30px;
  background-color: transparent;
  p {
    font-size: 18px;
    filter: drop-shadow(1px 2px 1px #000000);
  }
  @media (min-width: 600px) {
    p {
      font-size: 22px;
    }
  }
  @media (min-width: 1500px) {
    p {
      font-size: 24px;
    }
  }
`;

export const Form = styled.form`
  width: 80%;
  .save-button {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    margin-top: 20px;
    border: none;
    background-color: #ff8d3e;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin-top: 20px;
    background-color: #ffffff;
    font-size: 18px;
    text-align: center;
  }
  @media (min-width: 600px) {
    input {
      height: 70px;
      font-size: 22px;
    }
    .save-button {
      height: 70px;
      font-size: 22px;
    }
  }
  @media (min-width: 1500px) {
    input {
      height: 85px;
      font-size: 26px;
    }
    .save-button {
      height: 85px;
      font-size: 26px;
    }
  }
`;
