import { AxiosError } from "axios"
import { instance } from "./axios"
import { notification } from "antd"
import { ResponeDto } from "../models/ResponeDto";
import { CreateAdditionalIncome, CreateMainIncome } from "../models/IncomeDto";

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


export const getMainIncomeAPI = async (id: number) => {

  try {
    const data = await instance.get<ResponeDto>(api + "income/read-main-income/" + id);
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

export const getMainIncomesAPI = async (userId: string) => {
  try {
    const data = await instance.get<ResponeDto>(api + "income/read-main-incomes/" + userId);
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


export const getAdditionalIncomeAPI = async (id:number) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "income/read-additional-income/" + id));
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

export const getAdditionalIncomesAPI = async (userId: string) => {
  try {
    const data = await instance.get<ResponeDto>(api + "income/read-additional-incomes/" + userId);
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

export const createMainIncomeAPI = async (request:CreateMainIncome) => {
  try {
    const data = await instance.post(api + "income/create-main-income", request);
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

export const createAdditionalIncomeAPI = async (request:CreateAdditionalIncome) => {
  try {
    const data = await instance.post(api + "income/create-additional-income", request);
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

export const updateMainIncomeAPI = async (id:number, request:CreateMainIncome) => {
  try {
    const data = await instance.put(api + "income/update-main-income/" + id, request);
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

export const updateAdditionalIncomeAPI = async (id:number, request:CreateAdditionalIncome) => {
  try {
    const data = await instance.put(api + "income/update-additional-income/" + id, request);
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

export const deleteMainIncomeAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "income/delete-main-income/" + id);
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

export const deleteAdditionalIncomeAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "income/delete-additional-income/" + id);
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
