import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/UserService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { LoginRequest, RegisterRequest, LoginResponse } from "../models/UserDto";

type UserContextType = {
  userId: string | null;
  token: string | null;
  userName: string | null;
  registerUser: (registerRequest:RegisterRequest) => void;
  loginUser: (LoginRequest:LoginRequest) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId && token) {
      setUser(userId);
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    registerRequest: RegisterRequest
  ) => {
    await registerAPI(registerRequest)
      .then((res) => {
        toast.success("Register Success!");
        navigate("/login");
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (loginRequest:LoginRequest) => {
    await loginAPI(loginRequest)
        .then((res) => {
            if (res) {
              console.log(res?.data.isSuccess);
              if(res?.data.isSuccess == false){
                toast.warning(res?.data.message);
              }
              else
            try {
                const response: LoginResponse = res?.data.result as LoginResponse;
                localStorage.setItem("token", response.token);
                const userObj = response.user;
                localStorage.setItem("user", userObj.id);
                localStorage.setItem("userName", userObj.fullName);
                localStorage.setItem("email", userObj.email);
                setToken(response.token);
                setUser(userObj.id);
                setUserName(userObj.fullName);
                toast.success("Login Success!");
                navigate("/dashboard");
            }
            catch(e){
                toast.warning("Server error occured");
            }
        }
    })
    .catch((e) => toast.warning("Server error occured"));
};

  const isLoggedIn = () => {
    return !!userId;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    setUser(null);
    setToken("");
    setUserName("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ userName, loginUser, userId, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);

