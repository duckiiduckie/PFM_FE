import { AxiosError } from "axios"
import { CategoryPost, IncomePost } from "../models/IncomeDto"
import { instance } from "./axios"
import { notification } from "antd"
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


export const getIncomeListAPI = async (id: string) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "income/getincomes/" + id));
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

export const getIncomeAPI = async (id:number) => {
  try {
    const data = (await instance.get<ResponeDto>(api + "income/" + id));
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

export const createIncomeAPI = async (request:IncomePost) => {
  try {
    const data = await instance.post(api + "income", request);
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

export const updateIncomeAPI = async (id:number, request:IncomePost) => {
  try {
    const data = await instance.put(api + "income/" + id, request);
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

export const deleteIncomeAPI = async (id:number) => {
  try {
    const data = await instance.delete(api + "income/" + id);
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
    const data = (await instance.get<ResponeDto>(api + "income/category/getcategories/" + id));
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

export const getCategoryAPI = async (id: string) => {
  try {
    const data = await instance.get<ResponeDto>(api + "income/category/getcategories/" + id);
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
};

export const createCategoryAPI = async (request: CategoryPost) => {
  try {
    const data = await instance.post(api + "income/category", request);
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
};

export const updateCategoryAPI = async (id: number, request: CategoryPost) => {
  try {
    const data = await instance.put(api + "income/category/" + id, request);
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
};

export const deleteCategoryAPI = async (id: number) => {
  try {
    const data = await instance.delete(api + "income/category/" + id);
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
};
