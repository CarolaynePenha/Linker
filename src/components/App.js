import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/TokenContext";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

function App() {
  return (
    <DivApp>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </DivApp>
  );
}

export default App;

// --------------------------------------------css
const DivApp = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 100vh;
`;
