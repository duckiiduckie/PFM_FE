import { AxiosError } from "axios"
import { instance } from "./axios"
import { notification } from "antd"
import { ExpensePost } from "../models/ExpenseDto"
import { ResponeDto } from "../models/ResponeDto"
import { BudgetPost } from "../models/BudgetDto"


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


export const getBudgetListAPI = async (id: string) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "budget/getbudgets/" + id));
    if(data){
      
      const res = data.data
      if(res.isSuccess){
        return data
      }
      else{
        notification.error({
          message: "ERROR",
          description: res.message,
        });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}


export const getBudgetAPI = async (id:number) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "budget/" + id));
    if(data){
      const res = data.data
      if(res.isSuccess){
        return data
      }
      else{
        notification.error({
          message: "ERROR",
          description: res.message,
        });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}


export const getBudgetNowAPI = async (userId:string) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "budget/getbudgetnow/" + userId));
    if(data){
      const res = data.data
      if(res.isSuccess){
        return data
      }
      else{
        notification.error({
          message: "ERROR",
          description: res.message,
        });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}

export const createBudgetAPI = async (request:BudgetPost) => {
  try {
    const data = await instance.post(api + "budget", request);
    if(data){
      const res = data.data
      if(res.isSuccess){
        return data
      }
      else{
        notification.error({
          message: "ERROR",
          description: res.message,
        });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
}

export const updateExpenseAPI = async (id:string, request:ExpensePost) => {
  try {
    const data = await instance.put(api + "expense/" + id, request);
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

export const deleteBudgetAPI = async (id:string) => {
  try {
    const data = await instance.delete(api + "budget/" + id);
    if(data){
      
      const res = data.data
      if(res.isSuccess){
        return data
      }
      else{
        notification.error({
          message: "ERROR",
          description: res.message,
        });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      notification.error({
        message: "ERROR",
        description: error.response?.data.info.message,
      });
    }
  }
} 