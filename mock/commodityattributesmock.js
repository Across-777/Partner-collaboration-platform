// 返回数据结构
const brand = {
  content: [],
  total: 0,
  // totalPage: 0,
  page: 0,
  size: 10,
  success: '',
  message: '',
};
//处理返回数据
const selectAttribute = arg => {
  let count_num = 0;
  if (arg.name != undefined && arg.name != '') {
    if (arg.id != undefined && arg.id != '') {
      for (let item in content) {
        let obj = content[item];
        if (obj.name == arg.name && obj.id == arg.id) {
          count_num++;
          brand.content.push(obj);
        }
      }
    } else {
      for (let item in content) {
        let obj = content[item];
        if (obj.name == arg.name) {
          count_num++;
          brand.content.push(obj);
        }
      }
    }
  } else {
    if (arg.id != undefined && arg.id != '') {
      for (let item in content) {
        let obj = content[item];
        if (obj.id == arg.id) {
          count_num++;
          brand.content.push(obj);
        }
      }
    } else {
      brand.content = content;
    }
  }
  brand.total = count_num;
  // brand.size = arg.size;
  // brand.page = arg.page;

  // for (let item in content) {
  //     console.log(content[item]);
  // }
};

const delectAttribute = id => {
  for (let item in content) {
    let obj = content[item];
    // console.log(item);
    if (obj.id == id) {
      content[item].useable = !obj.useable;
      break;
    }
  }
};

const addOrEditAttribute = data => {
  if (data.id == undefined || data.id == '') {
    let id = content[content.length - 1].id + 1;
    data.id = id;
    content.push(data);
  } else {
    for (let item in content) {
      let obj = content[item];
      if (obj.id == data.id) {
        content.splice(item, 1, data);
        break;
      }
    }
  }
};

const selectAttributeByGroupId = groupInfo => {
  if (groupInfo.attrArr != undefined && groupInfo.attrArr != []) {
    // console.log(groupInfo.attrArr.length);
    let arr = groupInfo.attrArr;
    let i = 0;
    for (let item in content) {
      let obj = content[item];
      // console.log('id',obj.id,'arr',arr[i]);
      if (obj.id == arr[i]) {
        brand.content.push(obj);
        i++;
      }
    }
  }
};

const selectPreviewAttr = groupInfo => {
  // let newGroup=[{...groupInfo}];
  // console.log(newGroup);
  if (groupInfo != undefined && groupInfo != []) {
    for (let g in groupInfo) {
      let group = groupInfo[g];
      if (group.attrArr != undefined && group.attrArr != '') {
        let arr = group.attrArr;
        // console.log(arr);
        let i = 0;
        for (let item in content) {
          let obj = content[item];
          if (obj.id == arr[i]) {
            arr.splice(i, 1, obj);
            i++;
          }
        }
      }
    }
    brand.content = groupInfo;
  }
};
export default {
  'GET /attribute/find': (req, res) => {
    // console.log('req', req.query);
    brand.content = [];
    selectAttribute(req.query);
    brand.success = true;
    res.status(200).json(brand);
  },
  'POST /attribute/insert': (req, res) => {
    let data = req.body;
    // console.log(data);
    brand.content = [];
    addOrEditAttribute(data);
    brand.success = true;
    res.status(200).json(brand);
  },
  'GET /attribute/delete': (req, res) => {
    console.log('delete', req.query);
    brand.content = [];
    delectAttribute(req.query.id);
    brand.success = true;
    res.status(200).json(brand);
  },
  'GET /attribute/findByGroup': (req, res) => {
    // console.log('req', req.query);
    brand.content = [];
    brand.success = true;
    selectAttributeByGroupId(req.query);
    // console.log(brand);
    res.status(200).json(brand);
  },
  'POST /attribute/findPreviewAttr': (req, res) => {
    let data = req.body;
    // console.log('data', data);
    brand.content = [];
    brand.success = true;
    selectPreviewAttr(data);
    console.log(brand);
    res.status(200).json(brand);
  },
};

const content = [
  {
    id: 1,
    name: '文本输入测试',
    unit: '',
    saleable: false,
    defaultValue: '无1',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 0,
    searchable: true,
    description: '描述1',
    values: [],
  },
  {
    id: 2,
    name: '单选测试-内存',
    unit: '',
    saleable: true,
    defaultValue: '无2',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 1,
    searchable: true,
    description: '描述2',
    values: [
      {
        valueId: 1,
        valueName: '4G',
      },
      {
        valueId: 2,
        valueName: '8G',
      },
      {
        valueId: 3,
        valueName: '12G',
      },
      {
        valueId: 4,
        valueName: '16G',
      },
    ],
  },
  {
    id: 3,
    name: '复选框测试-颜色',
    unit: '',
    saleable: true,
    defaultValue: '无3',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 2,
    searchable: true,
    description: '描述3',
    values: [
      {
        valueId: 1,
        valueName: '灰色',
      },
      {
        valueId: 2,
        valueName: '白色',
      },
      {
        valueId: 3,
        valueName: '金色',
      },
      {
        valueId: 4,
        valueName: '蓝色',
      },
    ],
  },
  {
    id: 4,
    name: '时间控件测试',
    unit: '',
    saleable: false,
    defaultValue: '无4',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 3,
    searchable: true,
    description: '描述4',
    values: [],
  },
  {
    id: 5,
    name: '时间2',
    unit: '',
    saleable: false,
    defaultValue: '无4',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 3,
    searchable: true,
    description: '描述4',
    values: [],
  },
  {
    id: 6,
    name: '时间3',
    unit: '',
    saleable: false,
    defaultValue: '无4',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 3,
    searchable: true,
    description: '描述4',
    values: [],
  },
  {
    id: 7,
    name: '时间4',
    unit: '',
    saleable: false,
    defaultValue: '无4',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 3,
    searchable: true,
    description: '描述4',
    values: [],
  },
  {
    id: 8,
    name: '文本2',
    unit: '',
    saleable: false,
    defaultValue: '无4',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 0,
    searchable: true,
    description: '描述4',
    values: [],
  },
  {
    id: 9,
    name: '时间6',
    unit: '',
    saleable: false,
    defaultValue: '无4',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 3,
    searchable: true,
    description: '描述4',
    values: [],
  },
  {
    id: 10,
    name: '时间7',
    unit: '',
    saleable: false,
    defaultValue: '无4',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 3,
    searchable: true,
    description: '描述4',
    values: [],
  },
  {
    id: 11,
    name: '第二页时间控件',
    unit: '',
    saleable: false,
    defaultValue: '2020',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 3,
    searchable: true,
    description: '时间',
    values: [],
  },
  {
    id: 12,
    name: '第二页单选-匹',
    unit: '',
    saleable: false,
    defaultValue: '2020',
    nullable: false,
    createTime: '2020-07-07',
    useable: true,
    type: 1,
    searchable: true,
    description: '时间',
    values: [
      {
        valueId: 1,
        valueName: '1P',
      },
      {
        valueId: 2,
        valueName: '1.5P',
      },
      {
        valueId: 3,
        valueName: '2P',
      },
    ],
  },
];

function createContent(count, list = []) {
  for (let i = 1; i <= count; i++) {
    let day = i % 30 < 10 ? '0' + (i % 30) : i % 30;
    let values =
      i % 4 == 1 || i % 4 == 2
        ? [
            {
              valueId: 1,
              valueName: '是',
            },
            {
              valueId: 2,
              valueName: '否',
            },
          ]
        : [];
    list.push({
      id: i,
      name: '服务' + i,
      unit: '',
      saleable: Boolean(i % 2),
      defaultValue: '无' + i,
      nullable: Boolean(i % 2),
      createTime: '2020-07-' + day,
      useable: Boolean(i % 2),
      type: i % 4,
      searchable: Boolean(i % 2),
      values: values,
      description: i + i + i,
    });
  }
  return list;
}
// const content = createContent(20);
