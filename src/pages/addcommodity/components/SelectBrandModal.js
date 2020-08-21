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
} from 'antd';

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
    selectBrandModalVisible,
    closeSelectBrandModal,
    changeFormBrandName,
    changeBrandName,

    searchAttrFormFinish,
  } = props;
  // Modal 确认事件
  const handleOk = () => {
    closeSelectBrandModal();
    changeBrandName();
  };
  // Modal 取消事件
  const handleCancel = () => {
    closeSelectBrandModal();
  };
  // rowSelection配置 数据源和改变的事件
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys,selectedRows);
      changeFormBrandName(selectedRows[0].id, selectedRows[0].name);
    },
    type: 'radio',
  };

  return (
    <Modal
      title="品牌"
      width={800}
      visible={selectBrandModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      centered={true}
    >
      <Form onFinish={searchAttrFormFinish}>
        <Row>
          <Col span={9}>
            <Form.Item label="品牌编码" name="brandId">
              <Input style={{ width: '80%' }} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item label="品牌名称" name="brandName">
              <Input style={{ width: '80%' }} />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Button type="button">重置</Button>
          </Col>
        </Row>
      </Form>
      <Row className="table_txt">
        <Col span={24}>
          <div className="table_txt_div">品牌</div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
            rowKey="id"
            scroll={{ y: 300 }}
          />
        </Col>
      </Row>
    </Modal>
  );
};
