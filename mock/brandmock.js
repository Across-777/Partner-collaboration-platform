// 返回数据结构
const brand = {
  content: [],
  total: 0,
  // totalPage: 0,
  page: 0,
  size: 5,
};
//处理返回数据
const selectBrand = arg => {
  let count_num = 0;
  let start_num = (arg.page - 1) * arg.size + 1;
  let end_num = arg.page * arg.size;
  if (arg.brandName != undefined && arg.brandName != '') {
    if (arg.status != undefined) {
      for (let item in content) {
        let obj = content[item];
        if (obj.name == arg.brandName && obj.status == arg.status) {
          count_num++;
          if (count_num >= start_num && count_num <= end_num) {
            brand.content.push(obj);
          }
        }
      }
    } else {
      for (let item in content) {
        let obj = content[item];
        if (obj.name == arg.brandName) {
          count_num++;
          if (count_num >= start_num && count_num <= end_num) {
            brand.content.push(obj);
          }
        }
      }
    }
  } else {
    if (arg.status != undefined) {
      for (let item in content) {
        let obj = content[item];
        if (obj.status == arg.status) {
          count_num++;
          if (count_num >= start_num && count_num <= end_num) {
            brand.content.push(obj);
          }
        }
      }
    } else {
      for (let item in content) {
        let obj = content[item];
        count_num++;
        if (count_num >= start_num && count_num <= end_num) {
          brand.content.push(obj);
        }
      }
    }
  }
  brand.total = count_num;
  brand.size = arg.size;
  brand.page = arg.page;
  // console.log('arg', arg.status, arg.brandName, arg.page, arg.size);
  // console.log('total', brand.total);

  // for (let item in content) {
  //     console.log(content[item]);
  // }
};

const delectBrand = id => {
  for (let item in content) {
    let obj = content[item];
    // console.log(item);
    if (obj.id == id) {
      content.splice(item, 1);
      break;
    }
  }
};

const addOrEditBrand = data => {
  if (data.id == undefined) {
    let id = content[content.length - 1].id + 1;
    let item = { id, ...data };
    content.push(item);
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
export default {
  'GET /api/initbrand': (req, res) => {
    // console.log('initbrand');
    brand.content = [];
    let arg = {
      page: 1,
      size: 10,
    };
    selectBrand(arg);
    res.status(200).json(brand);
  },
  'GET /api/brand': (req, res) => {
    // console.log('req', req.query);
    // console.log('req.method', req.method);
    brand.content = [];
    selectBrand(req.query);
    res.status(200).json(brand);
  },
  'POST /api/brand': (req, res) => {
    const data = req.body;
    // console.log(data);
    addOrEditBrand(data);
  },
  'DELETE /api/brand': (req, res) => {
    // console.log('delete', req.query);
    delectBrand(req.query.id);
  },
};

function createContent(count, list = []) {
  for (let i = 1; i <= count; i++) {
    let day = i % 30 < 10 ? '0' + (i % 30) : i % 30;
    list.push({
      id: i,
      name: 'www' + i,
      status: (i % 4) + 1,
      operator_name: 'operator' + i,
      operate_time: '2020-07-' + day,
    });
  }
  return list;
}
const content = createContent(150);
