import React from 'react';
import { Modal, Table, Form } from 'antd';

export default props => {
  const { attrCategoryModalVisible, closeAttrCategoryModal } = props;
  // table 列名称
  const columns = [
    {
      title: '属性组编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '属性组名称',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '工业分类编码',
      dataIndex: 'name',
      key: 'name ',
    },
    {
      title: '工业分类名称',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '父级工业分类名称',
      dataIndex: 'saleable',
      key: 'saleable',
    },
  ];

  //modal 确认事件
  const handleOk = () => {
    // 关闭modal框
    closeAttrCategoryModal();
    // console.log('handleOk');
  };
  // modal 取消事件
  const handleCancel = () => {
    // 关闭modal框
    closeAttrCategoryModal();
    // console.log('Clicked cancel button');
  };

  return (
    <div>
      <Modal
        width={600}
        title="应用分类"
        visible={attrCategoryModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Table
          size={'small'}
          columns={columns}
          // dataSource={data.data.content}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};
