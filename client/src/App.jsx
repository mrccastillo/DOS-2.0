import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/components/Dashboard";
import Userprofile from "./pages/userprofile/components/Userprofile";
import Login from "./pages/login/components/Login";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);

  const decodeUser = () => {
    // const token = localStorage.getItem("token");
    const User = jwtDecode(token);
    const parsedUser = JSON.parse(User.user);
    setUser(parsedUser);
  };

  useEffect(() => {
    if (token) decodeUser();
  }, []);

  //nasa Dashboard at Nav ung temp fix sa delay marecognize ung token

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Dashboard user={user} /> : <Login />}
        ></Route>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/dosboard" element={<Dashboard user={user} />} />
        <Route
          path="/:username"
          element={token ? <Userprofile userLoggedIn={user} /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
