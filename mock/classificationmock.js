// 返回数据结构
const category = {
  content: [],
  success: '',
  message: '',
};
export default {
  'GET /category/getchild': (req, res) => {
    // console.log('getchild', req.query);
    if (req.query.id == '' || req.query.id == undefined || req.query.id == 0) {
      return res.status(200).json(category1);
    }
    if (req.query.id == 1) {
      return res.status(200).json(category2);
    } else if (req.query.id == 1001) {
      return res.status(200).json(category3);
    } else if (req.query.id == 1001002) {
      return res.status(200).json(category4);
    } else {
      return res.status(200).json(anthorcategory);
    }
  },
  'GET /group/find': (req, res) => {
    // console.log('getGroupInfo', req.query);
    category.content = [];
    selectGroup(req.query.categoryId);
    category.success = true;
    return res.status(200).json(category);
  },
  'GET /group/delete': (req, res) => {
    // console.log('delete group', req.query);
    deleteGroup(req.query.id);
    category.content = [];
    category.success = true;
    return res.status(200).json(category);
  },
  'POST /group/save': (req, res) => {
    const groupData = req.body;
    // console.log(groupData);
    addOrEditGroup(groupData);
    category.content = [];
    category.success = true;
    return res.status(200).json(category);
  },
  'GET /group/find': (req, res) => {
    // console.log('getGroupInfo', req.query);
    category.content = [];
    selectGroup(req.query.categoryId);
    category.success = true;
    return res.status(200).json(category);
  },
  'Get /group/changeBindAttr': (req, res) => {
    category.content = [];
    // console.log(req.query);
    changeBind(req.query.groupId, req.query.attrArr);
    return res.status(200).json(category);
  },
};

const selectGroup = cId => {
  if (cId != undefined || cId != '') {
    for (let item in AttrGroup) {
      let obj = AttrGroup[item];
      if (obj.categoryId == cId) {
        category.content.push(obj);
      }
    }
  }
};
const deleteGroup = groupId => {
  for (let item in AttrGroup) {
    let obj = AttrGroup[item];
    if (obj.id == groupId) {
      AttrGroup.splice(item, 1);
      break;
    }
  }
};
const addOrEditGroup = data => {
  if (data.id == undefined || data.id == '') {
    let id = AttrGroup[AttrGroup.length - 1].id + 1;
    data.id = id;
    data.attrArr = [];
    AttrGroup.push(data);
  } else {
    for (let item in AttrGroup) {
      let obj = AttrGroup[item];
      if (obj.id == data.id) {
        AttrGroup.splice(item, 1, data);
        break;
      }
    }
  }
};

const changeBind = (groupId, attrArr) => {
  if (groupId == undefined || groupId == '') {
    category.success = false;
  } else {
    if (attrArr == undefined) {
      attrArr = [];
    } else {
      attrArr = attrArr.map(item => Number(item));
    }
    // console.log(attrArr);
    category.success = true;
    for (let item in AttrGroup) {
      let obj = AttrGroup[item];
      if (obj.id == groupId) {
        obj.attrArr = attrArr;
        AttrGroup.splice(item, 1, obj);
        break;
      }
    }
  }
};

const AttrGroup = [
  {
    id: 1,
    name: '属性组1',
    categoryId: '1',
    sort: '1',
    attrArr: [1],
  },
  {
    id: 2,
    name: '属性组2',
    categoryId: 1,
    sort: '3',
    attrArr: [1, 3],
  },
  {
    id: 3,
    name: '属性组3',
    categoryId: 1,
    sort: '4',
    attrArr: [2, 3],
  },
  {
    id: 4,
    name: '属性组4',
    categoryId: 1,
    sort: '2',
    attrArr: [1, 2, 3, 4],
  },
  {
    id: 5,
    name: '属性组5',
    categoryId: 2,
    sort: '1',
    attrArr: [2],
  },
];

// ----------------------category 数据写死---------------------
const category1 = [
  {
    name: '空调',
    categoryId: 1,
  },
  {
    name: '冰洗',
    categoryId: 2,
  },
  {
    name: '影视',
    categoryId: 3,
  },
  {
    name: '厨卫',
    categoryId: 4,
    isLeaf: true,
  },
  {
    name: '小家电',
    categoryId: 5,
    isLeaf: true,
  },
];
const category2 = [
  {
    name: '家用空调',
    categoryId: 1001,
  },
  {
    name: '商用空调',
    categoryId: 1002,
  },
  {
    name: '空调配件',
    categoryId: 1003,
  },
];
const category3 = [
  {
    name: '挂机',
    categoryId: 1001001,
  },
  {
    name: '柜机',
    categoryId: 1001002,
  },
  {
    name: '吸顶机',
    categoryId: 1001003,
  },
];
const category4 = [
  {
    name: 'test',
    categoryId: 1001002001,
  },
];
const anthorcategory = [];
