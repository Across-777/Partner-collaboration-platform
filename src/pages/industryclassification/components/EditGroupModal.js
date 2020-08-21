import React from 'react';
import { Form, Button, Modal, Space, Input } from 'antd';

export default props => {
  const {
    groupRecord,
    editGroupModalVisible,
    closeEditGroupModal,
    editGroupFormFinish,
  } = props;
  const layout = {
    labelCol: {
      span: 6,
    },
  };

  const editFormRef = React.createRef();

  // Modal 确认事件
  const handleOk = () => {
    closeEditGroupModal();
    editFormRef.current.submit();
  };
  // Modal 取消事件
  const handleCancel = () => {
    closeEditGroupModal();
  };

  return (
    <Modal
      title="新增或编辑属性组"
      visible={editGroupModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        {...layout}
        ref={editFormRef}
        onFinish={editGroupFormFinish}
        initialValues={groupRecord}
        preserve={false}
      >
        <Form.Item label="属性组编码" name="id">
          {groupRecord.id}
        </Form.Item>
        <Form.Item label="属性组名称" name="name" rules={[{ required: true }]}>
          <Input style={{ width: '85%' }} />
        </Form.Item>
        <Form.Item
          label="顺序号"
          name="sort"
          rules={[
            {
              whitespace: true,
              type: 'number',
              transform(value) {
                if (value) {
                  return Number(value);
                }
              },
            },
          ]}
        >
          <Input style={{ width: '85%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
