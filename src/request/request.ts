import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
export default async (options: AxiosRequestConfig) => {
  // 创建一个axios实例
  const axiosConfig = {
    ...options,
    withCredentials: true,
    headers: {
      ...options.headers,
      token: (options as any).token,
    },
  };
  console.log(axiosConfig, 'axiosConfig');

  const instance: AxiosInstance = axios.create(axiosConfig);

  return await instance.request(axiosConfig);
};
