import React from 'react';
import { Input, Tree } from 'antd';
const { Search } = Input;
export default props => {
  const { treeData, getChildrenData, onSelectTreeNode } = props;

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

  return (
    <div className="SearchTree">
      <Search style={{ width: '100%' }} placeholder="Search" />
      <Tree
        loadData={onLoadData}
        treeData={treeData}
        onSelect={onSelectTreeNode}
      />
    </div>
  );
};
