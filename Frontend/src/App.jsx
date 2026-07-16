import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx"
import CaptainSignUp from "./pages/CaptainSignUp.jsx";
import CaptainSignin from "./pages/CaptainSignIn.jsx";
import UserSignUp from "./pages/UserSignUp.jsx";
import UserSignin from "./pages/UserSignIn.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signin" element={<UserSignin />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/captain/signin" element={<CaptainSignin />} />
        <Route path="/captain/signup" element={<CaptainSignUp />} />
      </Routes>
    </div>
  )
}

export default App