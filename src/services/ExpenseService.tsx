import { AxiosError } from "axios"
import { instance } from "./axios"
import { notification } from "antd"
import { ExpensePost } from "../models/ExpenseDto"


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

export const createExpenseAPI = async (request:ExpensePost) => {
  try {
    const data = await instance.post(api + "expense", request);
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