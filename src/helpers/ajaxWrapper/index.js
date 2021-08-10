import axios from 'axios';

export const ajaxWrapper = (params) => {
  const token = localStorage.getItem('token');
  let defautlHeaders = {
    'Content-Type': 'application/json',
    'Authorization': token,
  };

  const headers = {
    ...defautlHeaders,
    ...params.headers,

  };

  return axios({
    headers,
    method: params.method,
    url: params.url,
    data: params.data,
  });
}
