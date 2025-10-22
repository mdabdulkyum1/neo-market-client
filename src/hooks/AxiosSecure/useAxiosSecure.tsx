// import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
// import useAuth from '../GetAuthInfo/useAuth';
// import { useNavigate } from 'react-router-dom';

// const axiosInstance: AxiosInstance = axios.create({
//   // baseURL: 'https://neo-market-server.onrender.com'
//   // baseURL: ''
// });

// const useAxiosSecure = (): AxiosInstance => {
//   const { logOut } = useAuth();
//   const navigate = useNavigate();

//   // Request interceptor
//   axiosInstance.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//       const token = localStorage.getItem('access-token');
//       if (token && config.headers) {
//         config.headers.authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error: any) => {
//       return Promise.reject(error);
//     }
//   );

//   // Response interceptor
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//       const status = error.response?.status;
//       if (status === 401 || status === 403) {
//         await logOut();
//         navigate('/login');
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxiosSecure;
