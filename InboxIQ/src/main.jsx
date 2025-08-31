import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Login from "./component/Login/Login.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Home from "./component/Home/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "./component/Dashboard/Dashboard.jsx";

// created Router with two pages, one login and other main
const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      {/* <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />  */}
      {/* uncomment when adding private routes */}
      <Route path="dashboard" element = {<Dashboard/>}/>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
