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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dosboard" element={<Dashboard />} />
        <Route
          path="/:username"
          element={token ? <Userprofile /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
