import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/TokenContext";
import { UserProvider } from "../context/UserContext";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Timeline from "./Timeline";
import User from "./User";

function App() {
  return (
    <DivApp>
      <UserProvider>
        <TokenProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/user/:id" element={<User />} />
            </Routes>
          </BrowserRouter>
        </TokenProvider>
      </UserProvider>
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
