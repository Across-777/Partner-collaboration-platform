import { Menu, Breadcrumb } from 'antd';
import { Link } from 'umi';

export default props => {
  const { click } = props;
  const { SubMenu } = Menu;
  const menu = [
    {
      code: '1',
      name: '京东商品管理',
      children: [
        {
          code: '1.1',
          name: '品牌确认',
          href: '/option',
        },
        {
          code: '1.2',
          name: '京东商品池查询',
          href: '/option2',
        },
      ],
    },
    {
      code: '2',
      name: '商品管理',
      children: [
        {
          code: '2.1',
          name: '商品属性管理',
          href: '/commodityattributes',
        },
        {
          code: '2.2',
          name: '工业分类属性模板',
          href: '/industryclassification',
        },
        {
          code: '2.3',
          name: '商品引进',
          href: '/commodityEntry',
        },
      ],
    },
  ];
  //将数据处理成map(键值对)类型数据，并返回
  function createBreadMenu(menuData, map = {}) {
    menuData.map(element => {
      map[`${element.code}`] = element.name;
      // map.set(element.code, element.name);
      if (element.children) {
        createBreadMenu(element.children, map);
      }
    });
    return map;
  }

  // 创建面包屑组件，并返回
  const createBread = keyPath => {
    let newMenuMap = createBreadMenu(menu, newMenuMap);
    // console.log('newMenuMap', newMenuMap);
    let breadItemArr = [];
    keyPath.forEach(item => {
      breadItemArr.unshift(
        <Breadcrumb.Item key={item}>{newMenuMap[item]}</Breadcrumb.Item>,
      );
    });
    // console.log('breadItemArr', breadItemArr);
    return (
      <Breadcrumb separator="->" style={{ margin: '16px 0' }}>
        {breadItemArr}
      </Breadcrumb>
    );
  };

  // 菜单点击事件
  const handleClick = ee => {
    const { key, keyPath } = ee;
    // console.log('handleClick', keyPath);
    let breadNameDOM = createBread(keyPath);
    click(breadNameDOM);
  };

  /* // 格式化menu数据为Map<code,name>的形式
    const formatMenuToMap = (menuData, map) =>
        menuData.map(element => {
            map.set(element.code, element.name);
            if (element.children) {
                formatMenuToMap(element.children, map);
            }
        });

    // 创建面包屑组件，并返回
    const createBreadcrumb = keyPath => {
        let newMenuMap = new Map();
        formatMenuToMap(menu, newMenuMap);
        console.log('newMenuMap', newMenuMap);
        let breadItemArr = [];
        keyPath.forEach(item => {
            breadItemArr.unshift(
                <Breadcrumb.Item key={item}>{newMenuMap.get(item)}</Breadcrumb.Item>,
            );
        });
        console.log('breadItemArr', breadItemArr);
        return (
            <Breadcrumb separator="->" style={{ margin: '16px 0' }}>
                {breadItemArr}
            </Breadcrumb>
        );
    }; */

  // 用递归处理数据，将其处理为导航栏
  function createMenuItem(menu) {
    return menu.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.code} title={item.name}>
            {createMenuItem(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.code}>
            <Link to={item.href}>{item.name}</Link>
          </Menu.Item>
        );
      }
    });
  }
  return (
    <Menu
      // defaultSelectedKeys={['1.1']}
      // defaultOpenKeys={["1"]}
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      onClick={handleClick}
    >
      {createMenuItem(menu)}
    </Menu>
  );
};
