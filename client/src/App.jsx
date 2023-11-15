import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/components/Dashboard";
import Userprofile from "./pages/userprofile/components/Userprofile";
import Login from "./pages/login/components/Login";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);

  //test push

  const verifyToken = async () => {
    try {
      await axios.get("https://backend.dosshs.online/api/jwt/token", {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      if (
        err.response.request.status === 401 ||
        err.response.request.status === 403
      ) {
        localStorage.removeItem("token");
        location.href = "/login";
        return console.error(err.response.data.message);
      } else return console.error(err.response.data.message);
    }
  };

  const decodeUser = () => {
    verifyToken();
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
