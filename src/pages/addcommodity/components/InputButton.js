import React from 'react';
import { Table, Input, Form, Space, Button, Row, Col } from 'antd';

// 此组件作废
export default props => {
  const { openModal } = props;

  return (
    <Row>
      <Col span={20}>
        <Form.Item
          label="品牌"
          name="brand"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 14 }}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Button shape="circle" onClick={openModal}>
          ···
        </Button>
      </Col>
    </Row>
  );
};
