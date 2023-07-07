import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./tools/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/tasks" element={<><NavBar /> <TasksPage /></>}></Route>
              <Route path="/add-task" element={<><NavBar /> <TaskFormPage /></>}></Route>
              <Route path="/tasks/:id" element={<><NavBar /><TaskFormPage /></>}></Route>
              <Route path="/profile" element={<><NavBar /><ProfilePage /></>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
