import axios, { CreateAxiosDefaults } from 'axios';
const request = axios.create({
    baseURL: "http://localhost:8805",
    timeout: 20000,
    headers: {'Content-Type': 'application/json'},
});
export const uploadImageToImgBB = (params: any) =>
    request({
      baseURL: 'https://api.imgbb.com/1/upload',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
export default request;