import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateUserResource from "./components/CreateUserResource";
import CreateTeamResource from "./components/CreateTeamResource";
import TeamMembers from "./components/TeamMembers";
import SelectedUserResources from "./components/SelectedUserResources";
import UserInfo from "./components/UserInfo";
import Faq from "./components/FavoriteQuestions";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-resource" element={<CreateUserResource />} />
          <Route path="/create-team" element={<CreateTeamResource />} />
          <Route path="/team-members" element={<TeamMembers />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route
            path="/team-members/user-resources"
            element={<SelectedUserResources />}
          />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
