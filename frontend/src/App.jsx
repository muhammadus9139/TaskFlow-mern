import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import About from "./pages/About";
import Contact from "./pages/Contact";
import AddTask from "./pages/AddTask";
import TaskList from "./components/TaskList";
import UpdateTask from "./pages/UpdateTask";

import Signup from "./components/Signup";
import Login from "./components/Login";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";

function App() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>

      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Private Pages */}

        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />

        <Route
          path="/update-task/:id"
          element={
            <PrivateRoute>
              <UpdateTask />
            </PrivateRoute>
          }
        />

      </Routes>


    </>
  );
}

export default App;