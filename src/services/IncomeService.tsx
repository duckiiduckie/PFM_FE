import { AxiosError } from "axios"
import { IncomeGet, IncomePost } from "../models/IncomeDto"
import { instance } from "./axios"
import { notification } from "antd"

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


export const getIncomeListAPI = async (id: string) => {
  try {
    const data = (await instance.get<IncomeGet[]>(api + "income/getincomes" + id));
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}

export const getIncomeAPI = async (id:string) => {
  try {
    const data = (await instance.get<IncomeGet>(api + "income/" + id));
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}

export const createIncomeAPI = async (request:IncomePost) => {
  try {
    const data = await instance.post(api + "income", request);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}

export const updateIncomeAPI = async (id:string, request:IncomeGet) => {
  try {
    const data = await instance.put(api + "income/" + id, request);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}

export const deleteIncomeAPI = async (id:string) => {
  try {
    const data = await instance.delete(api + "income/" + id);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}