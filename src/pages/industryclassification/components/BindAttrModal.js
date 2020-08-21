import React from 'react';
import { Row, Col, Form, Button, Table, Modal, Space, Input } from 'antd';

const columns = [
  {
    title: '属性编码',
    dataIndex: 'id',
  },
  {
    title: '属性名称',
    dataIndex: 'name',
  },
  {
    title: '是否销售属性',
    dataIndex: 'saleable',
    key: 'saleable ',
    render: (text, record) => [
      <Space key={record.id}>{text ? '是' : '否'}</Space>,
    ],
  },
];

export default props => {
  const {
    groupName,
    allAttrData,
    BindAttrModalVisible,
    closeBindAttrModal,
    searchAttrFormFinish,
    selectedRowKey,
    changeSelectedRowKeys,
    clickOkHandler,
  } = props;
  // Modal 确认事件
  const handleOk = () => {
    closeBindAttrModal();
    clickOkHandler(selectedRowKey);
  };
  // Modal 取消事件
  const handleCancel = () => {
    closeBindAttrModal();
  };
  let selectedKey;
  // rowSelection配置 数据源和改变的事件
  const rowSelection = {
    selectedRowKeys: selectedRowKey,
    // onChange: selectedRowKeys => {
    //   changeSelectedRowKeys(selectedRowKeys);
    // },
    onSelect: (record, selected, selectedRows) => {
      selectedKey = [...selectedRowKey];
      if (selected) {
        selectedKey.push(record.id);
      } else {
        selectedKey = selectedKey.filter(item => {
          if (item != record.id) return item;
        });
        // console.log('----------------',record.id,selectedKey);
      }
      changeSelectedRowKeys(selectedKey);
    },
  };

  return (
    <Modal
      title={groupName}
      width={800}
      visible={BindAttrModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      centered={true}
    >
      <Form onFinish={searchAttrFormFinish}>
        <Row>
          <Col span={10}>
            <Form.Item label="属性编码" name="id">
              <Input style={{ width: '80%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="属性名称" name="name">
              <Input style={{ width: '80%' }} />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={allAttrData.content}
            rowSelection={rowSelection}
            rowKey="id"
            scroll={{ y: 320 }}
          />
        </Col>
      </Row>
    </Modal>
  );
};
