import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
export default async (options: AxiosRequestConfig) => {
  // 创建一个axios实例
  const axiosConfig: AxiosRequestConfig = {
    ...options,
    withCredentials: true,
    headers: {
      ...options.headers,
      'Content-Type': options.headers
        ? options.headers['Content-Type']
          ? options.headers['Content-Type']
          : 'application/json'
        : 'application/json',
      'token': (options as any).token,
    },
  };

  const instance: AxiosInstance = axios.create(axiosConfig);

  return await instance.request<any>(axiosConfig);
};
