import { AxiosError } from "axios"
import { instance } from "./axios"
import { notification } from "antd"
import { ResponeDto } from "../models/ResponeDto"
import { CreateBudget } from "../models/BudgetDto"


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

export const getBudgetAPI = async (id:number) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "budget/get-budget/" + id));
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

export const getBudgetsAPI = async (userId: string) => {
  try {
    const data = await instance.get<ResponeDto>(api + "budget/get-budgets/" + userId);
    if (data) {
      const res = data.data;
      if (res.isSuccess) {
        return data;
      } else {
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

export const getBudgetNowAPI = async (userId: string) => {
  try {
    const data = await instance.get<ResponeDto>(api + "budget/get-budget-now/" + userId);
    if (data) {
      const res = data.data;
      if (res.isSuccess) {
        return data;
      } else {
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

export const createBudgetAPI = async (request:CreateBudget) => {
  try {
    const data = await instance.post(api + "budget/create-budget", request);
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

export const updateBudgetAPI = async (id:number, request:CreateBudget) => {
  try {
    const data = await instance.put(api + "budget/update-budget/" + id, request);
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

export const deleteBudgetAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "budget/delete-budget/" + id);
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
