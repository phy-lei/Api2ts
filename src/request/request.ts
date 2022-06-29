import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
export default async (options: AxiosRequestConfig) => {
  // 创建一个axios实例
  const axiosConfig = {
    ...options,
    withCredentials: true,
    headers: {
      token: 'PC_f1aff6a83a4c18851d9d247ee6480de0',
      ...options.headers,
    },
    // timeout:3000
  };

  const instance: AxiosInstance = axios.create(axiosConfig);

  return await instance.request(axiosConfig);
};
