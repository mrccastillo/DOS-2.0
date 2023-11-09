import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/components/Dashboard";
import Userprofile from "./pages/userprofile/components/Userprofile";
import Login from "./pages/login/components/Login";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Login />}></Route>
        <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
        <Route
          path="/userprofile"
          element={token ? <Userprofile /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
