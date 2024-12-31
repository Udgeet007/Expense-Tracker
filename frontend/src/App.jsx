import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
// import Trial from "./pages/Trial";
// import HomeBetterCode from "./pages/HomeBetterCode";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<HomeBetterCode />} /> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/trail" element={<Trial />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
