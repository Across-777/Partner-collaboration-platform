import React from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
  Space,
  Input,
  Radio,
  Tree,
} from 'antd';
const { Search } = Input;
const columns = [
  {
    title: '品牌编码',
    dataIndex: 'id',
  },
  {
    title: '品牌名称',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'operate_time',
    key: 'operate_time ',
  },
];
const data = [];
for (let i = 1; i < 46; i++) {
  data.push({
    id: i,
    name: `Edward King ${i}`,
    operate_time: `2020-08-${i}`,
  });
}
export default props => {
  const {
    selectCategoryModalVisible,
    closeSelectCategoryModal,

    treeData,
    getChildrenData,
  } = props;
  // Modal 确认事件
  const handleOk = () => {
    closeSelectCategoryModal();
    // changeBrandName();
  };
  // Modal 取消事件
  const handleCancel = () => {
    closeSelectCategoryModal();
  };

  // 异步加载树
  const onLoadData = ({ key, children }) => {
    return new Promise(resolve => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        // 调用父组件函数 dispatch 获取children 数据，更改treeData
        getChildrenData(key, treeData);
        resolve();
      }, 1);
    });
  };
  // 点击工业节点
  const onSelectTreeNode = (value, e) => {
    // console.log(node.node.key, node.node.title);
    console.log(e.node);
    dispatch({
      type: 'addcommodity/update',
      payload: {
        categoryId: node.node.key,
        categoryName: node.node.title,
      },
    });
  };

  return (
    <Modal
      title="工业分类：选择分类时，请选择末级分类"
      visible={selectCategoryModalVisible}
      width={380}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      centered={true}
    >
      <p>如工业分类无法选择，请联系系统管理员开通权限！</p>
      <Search style={{ width: '100%' }} placeholder="Search" />
      <Tree
        loadData={onLoadData}
        treeData={treeData}
        style={{ fontSize: 15 }}
        height={350}
        onSelect={onSelectTreeNode}
        // defaultExpandAll
      />
    </Modal>
  );
};
