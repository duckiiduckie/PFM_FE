import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Income from "../components/Income/Income";
import Expense from "../components/Expense/Expense";
import Budget from "../components/Budget/Budget";
import Dashboard from "../components/Dashboard/Dashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import User from "../components/User/User";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/Resetpassword";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot-password", element: <ForgotPassword />},
        { path: "reset-password", element: <ResetPassword />},
        {
            path: "dashboard",
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
            children: [
              { path: "", element: <Dashboard /> },
              { path: "income", element: <Income /> },
              { path: "expense", element: <Expense /> },
              { path: "budget", element: <Budget /> },
              { path: "user", element: <User />}
            ],
          },
      ],
    },
  ]);