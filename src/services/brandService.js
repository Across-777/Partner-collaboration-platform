import request from '../utils/request';
import qs from 'qs';

// 初始化表格数据
export const initBrandService = async () => {
  return request('/api/initbrand');
};
// 根据条件查找表格数据
export const getBrandService = async submitInfo => {
  console.log('submitInfo', submitInfo);
  return request('/api/brand?' + qs.stringify(submitInfo), {
    method: 'GET',
  });
};
// 根据id 删除数据
export const deleteBrandService = async id => {
  const bodyInfo = JSON.stringify(id);
  return request('/api/brand?' + `id=${id}`, {
    method: 'DELETE',
  });
};

// 增加或者修改数据
export const addOrEditBrandService = async (id, values) => {
  let data = { id, ...values };
  const bodyInfo = JSON.stringify(data);
  return request('/api/brand', {
    method: 'POST',
    body: bodyInfo,
  });
};
