import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import StudentForm from "./includes/StudentForm";
import GetAll from "./includes/GetAll";
import EditStudent from "./includes/EditStudent";
import Header from "./templates/Header";
import GetSingleStudent from "./includes/GetSingleStudent";
import Login from "./includes/Login";
import Profile from "./includes/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="add" element={<StudentForm />}></Route>
          <Route path="view" element={<GetAll />}></Route>
          <Route path="view/:id" element={<GetSingleStudent />}></Route>
          <Route path="edit/:id" element={<EditStudent />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="login/:username/:password" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
