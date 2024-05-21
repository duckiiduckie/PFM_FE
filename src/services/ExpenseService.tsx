import { AxiosError } from "axios"
import { instance } from "./axios"
import { notification } from "antd"
import { CategoryPost, ExpensePost } from "../models/ExpenseDto"
import { ResponeDto } from "../models/ResponeDto"


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


export const getExpenseListAPI = async (id: string) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "expense/getexpenses/" + id));
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


export const getCategoryListAPI = async (id: string) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "expense/category/getcategories/" + id));
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

export const getExpenseAPI = async (id:number) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "expense/" + id));
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

export const createExpenseAPI = async (request:ExpensePost) => {
  try {
    const data = await instance.post(api + "expense", request);
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

export const createCategoryAPI = async (request:CategoryPost) => {
  try {
    const data = await instance.post(api + "expense/category", request);
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

export const updateExpenseAPI = async (id:number, request:ExpensePost) => {
  try {
    const data = await instance.put(api + "expense/" + id, request);
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

export const updateCategoryAPI = async (id:number, request:CategoryPost) => {
  try {
    const data = await instance.put(api + "expense/category/" + id, request);
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

export const deleteExpenseAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "expense/" + id);
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

export const deleteCategoryAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "expense/category/" + id);
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