import axios from "axios";
import { instance } from './axios';
import { handleError } from "../helpers/ErrorHandler";
import { LoginRequest, RegisterRequest, UserGet, UserPut} from "../models/UserDto";
import { ResponeDto } from "../models/ResponeDto";


instance.interceptors.request.use(
  (config) => {
      const accessToken = localStorage.getItem('token')
      if (
          !!accessToken &&
          config.headers &&
          !config.headers['Authorization']
      ) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config
  },
  (error) => {
      return Promise.reject(error)
  },
)
const api = instance.defaults.baseURL;


export const loginAPI = async (request : LoginRequest) => {
  try {
    const data = await axios.post<ResponeDto>(api + "auth/login", {
      email: request.email,
      password: request.password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  request: RegisterRequest
) => {
  try {
    const data = await axios.post<ResponeDto>(api + "auth/register", {
      email: request.email,
      fullName: request.name,
      password: request.password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserAPI = async (id:string) => {
  try {
    const data = (await instance.get<UserGet>(api + "user/" + id));
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const updateUserAPI = async (id:string, request: UserPut) => {
  try {
    const data = await instance.put<ResponeDto>(api + "user/" + id, {
      email: request.email,
      fullName: request.fullName,
      phoneNumber: request.phoneNumber,
      birthDay: request.birthDay,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
}

export const resetPasswordAPI = async (request: any) => {
  try {
    const data = await axios.post(api + "auth/reset-password", {
      email: request.email,
      token: request.token,
      password: request.password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPasswordAPI = async (email: any) => {
  try {
    const data = await axios.post(api + "auth/forgot-password", 
      { mail: email },
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};