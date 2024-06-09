import { AxiosError } from "axios"
import { instance } from "./axios"
import { notification } from "antd"
import { ResponeDto } from "../models/ResponeDto";
import { CreateDailyExpense, CreateFuturePlannedExpense } from "../models/ExpenseDto";

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


export const getDailyExpenseAPI = async (id: number) => {

  try {
    const data = await instance.get<ResponeDto>(api + "expense/read-daily-expense/" + id);
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

export const getDailyExpensesAPI = async (userId: string) => {
  try {
    const data = await instance.get<ResponeDto>(api + "expense/read-daily-expenses/" + userId);
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


export const getFuturePlannedExpenseAPI = async (id:number) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "expense/read-future-planned-expense/" + id));
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

export const getFuturePlannedExpensesAPI = async (userId: string) => {
  try {
    const data = await instance.get<ResponeDto>(api + "expense/read-future-planned-expenses/" + userId);
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

export const createDailyExpenseAPI = async (request:CreateDailyExpense) => {
  try {
    const data = await instance.post(api + "expense/create-daily-expense", request);
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

export const createFuturePlannedExpenseAPI = async (request:CreateFuturePlannedExpense) => {
  try {
    const data = await instance.post(api + "expense/create-future-planned-expense", request);
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

export const updateDailyExpenseAPI = async (id:number, request:CreateDailyExpense) => {
  try {
    const data = await instance.put(api + "expense/update-daily-expense/" + id, request);
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

export const updateFuturePlannedExpenseAPI = async (id:number, request:CreateFuturePlannedExpense) => {
  try {
    const data = await instance.put(api + "expense/update-future-planned-expense/" + id, request);
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

export const deleteDailyExpenseAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "expense/delete-daily-expense/" + id);
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

export const deleteFuturePlannedExpenseAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "expense/delete-future-planned-expense/" + id);
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
