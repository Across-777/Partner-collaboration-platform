import request from '../utils/request';
import qs from 'qs';

// 根据id 查询子节点信息
export const getChildrenInfoService = async id => {
  // const bodyInfo = JSON.stringify(id);
  return request('/category/getchild?' + `id=${id}`, {
    method: 'GET',
  });
};

// 根据 工业分类id 查询所工业分类绑定的属性组
export const getGroupInfoService = async id => {
  // console.log(id);
  return request('/group/find?' + `categoryId=${id}`, {
    method: 'GET',
  });
};

// 根据属性组id 删除属性组
export const deleteGroupService = async id => {
  // const bodyInfo = JSON.stringify(id);
  return request('/group/delete?' + `id=${id}`, {
    method: 'GET',
  });
};

// 增加或者修改属性组信息
export const addOrEditGroupService = async (categoryId, values, attrArr) => {
  let bodyInfo = JSON.stringify({ categoryId, ...values, attrArr });
  // console.log(bodyInfo);
  return request('/group/save', {
    method: 'POST',
    body: bodyInfo,
  });
};
// 属性组绑定属性
export const changeBindAttrService = async (groupId, attrArr) => {
  const sortNumber = (a, b) => {
    return a - b;
  };
  attrArr = attrArr.sort(sortNumber);
  // console.log('++++++++++++++++++++++++', attrArr);
  return request(
    '/group/changeBindAttr?' + qs.stringify({ groupId, attrArr }),
    {
      method: 'GET',
    },
  );
};
