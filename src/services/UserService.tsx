import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { LoginRequest, RegisterRequest} from "../models/UserDto";
import { ResponeDto } from "../models/ResponeDto";

const api = "http://localhost:701/api/";

export const loginAPI = async (request : LoginRequest) => {
  try {
    const data = await axios.post<ResponeDto>(api + "auth/login", {
      username: request.username,
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
      email: request.username,
      username: request.name,
      password: request.password,
      phone: request.phone,
      birthday: request.birthday,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserAPI = async () => {
  try {
    const data = await axios.get<ResponeDto>(api + "user");
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const updateUserAPI = async (request: RegisterRequest) => {
  try {
    const data = await axios.put<ResponeDto>(api + "user", {
      email: request.username,
      username: request.name,
      password: request.password,
      phone: request.phone,
      birthday: request.birthday,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
}