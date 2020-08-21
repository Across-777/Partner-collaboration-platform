import request from '../utils/request';
import qs from 'qs';

// 根据条件查找属性
export const getAttributesService = async submitSeacherInfo => {
  return request('/attribute/find?' + qs.stringify(submitSeacherInfo), {
    method: 'GET',
  });
};
export const getAllAttributesService = async () => {
  console.log('getAllAttributesService');
  return request('/attribute/find', {
    method: 'GET',
  });
};
// 根据id 废除属性
export const deleteAttributeService = async id => {
  // const bodyInfo = JSON.stringify(id);
  return request('/attribute/delete?' + `id=${id}`, {
    method: 'GET',
  });
};

// 增加或者修改属性
export const addOrEditAttributeService = async values => {
  // let data = { id, ...values };
  const bodyInfo = JSON.stringify(values);
  return request('/attribute/insert', {
    method: 'POST',
    body: bodyInfo,
  });
};

// 根据属性组id 查询拥有属性
export const findAttrByGroupIdService = async (groupId, attrArr) => {
  return request(
    '/attribute/findByGroup?' + qs.stringify({ groupId, attrArr }),
    {
      method: 'GET',
    },
  );
};

// 根据属性组id 查询拥有属性
export const findPreviewAttrService = async groupInfo => {
  // console.log(groupInfo);
  groupInfo = groupInfo.map(item => {
    let name = item.name;
    let attrArr = item.attrArr;
    return { name, attrArr };
  });
  // console.log('2',groupInfo);
  const bodyInfo = JSON.stringify(groupInfo);
  return request('/attribute/findPreviewAttr', {
    method: 'POST',
    body: bodyInfo,
  });
};
