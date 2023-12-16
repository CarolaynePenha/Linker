import styled from "styled-components";
import { useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { Link, useNavigate } from "react-router-dom";

import Loading from "./Loading";
import { ButtonRegisterLogin } from "./SignIn";
import { Form } from "./SignIn";
import CompleteHeader from "./CompleteHeader";

export default function SignUp() {
  const [infoSignUp, setInfoSignUp] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    image: "",
  });
  const [buttonState, setButtonState] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Cadastrar");
  const [messagedisplay, setMessageDisplay] = useState("none");

  const navigate = useNavigate();

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = process.env.REACT_APP_API_URL + "/signUp";
    try {
      const response = await axios.post(URL, infoSignUp);

      navigate("/");
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      setButtonLoading("Cadastrar");
      if (err.response.status === HttpStatusCode.Conflict) {
        return alert("Esse e-mail já existe");
      }
      alert("Usuário ou senha inválidos!");
    }
  }
  function mostrarMensagem() {
    setMessageDisplay("block");
  }
  function esconderMensagem() {
    setMessageDisplay("none");
  }

  const { email, password, name, repeatPassword, image } = infoSignUp;
  return (
    <>
      <CompleteHeader />
      <SignUPContent>
        <Conteiner>
          <Form onSubmit={post}>
            <input
              disabled={buttonState}
              type="text"
              required
              placeholder="nome"
              value={name}
              onChange={(e) =>
                setInfoSignUp({ ...infoSignUp, name: e.target.value })
              }
            />
            <input
              disabled={buttonState}
              type="email"
              required
              placeholder="e-mail"
              value={email}
              onChange={(e) =>
                setInfoSignUp({ ...infoSignUp, email: e.target.value })
              }
            />
            <input
              className="passwordInput"
              disabled={buttonState}
              type="password"
              required
              placeholder="senha"
              onMouseEnter={mostrarMensagem}
              onMouseLeave={esconderMensagem}
              value={password}
              onChange={(e) =>
                setInfoSignUp({ ...infoSignUp, password: e.target.value })
              }
            />
            <DivMessage messagedisplay={messagedisplay}>
              A senha deve ter no mínimo 8 caracteres, ao menos uma letra
              maiúscula, uma minuscula, um número e um caractere
              especial(@$!%*?&)"
            </DivMessage>
            <input
              disabled={buttonState}
              type="password"
              required
              placeholder="repita a senha"
              value={repeatPassword}
              onChange={(e) =>
                setInfoSignUp({ ...infoSignUp, repeatPassword: e.target.value })
              }
            />
            <input
              type="url"
              disabled={buttonState}
              required
              placeholder="Imagem"
              value={image}
              onChange={(e) =>
                setInfoSignUp({ ...infoSignUp, image: e.target.value })
              }
            ></input>
            <button
              disabled={buttonState}
              type="submit"
              className="save-button"
            >
              {buttonLoading}
            </button>
          </Form>
          <Link to={"/"}>
            <ButtonRegisterLogin disabled={buttonState}>
              <p>Já tem uma conta? Faça login!</p>
            </ButtonRegisterLogin>
          </Link>
        </Conteiner>
      </SignUPContent>
    </>
  );
}

// ------------------------------------------css
const SignUPContent = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Conteiner = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DivMessage = styled.div`
  display: ${(props) => props.messagedisplay};
`;
