import styled from "styled-components";

export default function CompleteHeader() {
  return (
    <Conteiner>
      <p>
        <strong>Linker </strong>
      </p>
      <p>Salve, compartilhe e descubra os melhores links da internet.</p>
    </Conteiner>
  );
}

// -------------------css

const Conteiner = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #272330;
  p {
    max-width: 90%;
    margin-bottom: 10px;
    font-size: 20px;
    color: white;
    filter: drop-shadow(1px 2px 1px #000000);
  }
  strong {
    font-size: 30px;
    font-family: "Abril Fatface", serif;
  }
  @media (min-width: 800px) {
    height: 100vh;
    width: 60%;
    strong {
      font-size: 45px;
    }
    p {
      font-size: 26px;
    }
  }
  @media (min-width: 1300px) {
    strong {
      font-size: 50px;
    }
    p {
      font-size: 28px;
    }
  }
  @media (min-width: 1700px) {
    strong {
      font-size: 60px;
    }
    p {
      font-size: 32px;
    }
  }
`;
