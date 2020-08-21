import { fetch } from 'dva';

const checkStatus = response => {
  if (response.status == 200) return response;
  throw { message: 'error' };
};
const parseJson = response => {
  const { statusText, status } = response;
  return response.json().then(res => {
    // console.log('parsejson.res', res)
    return {
      data: res,
      statusCode: status,
      message: statusText,
      success: true,
    };
  });
};
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export default (url, options) => {
  return fetch(url, { ...options, headers })
    .then(checkStatus)
    .then(parseJson);
};
