import React from 'react';
import { Row, Col, Form, Select, Button, Input, DatePicker } from 'antd';

export default props => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { data, dispatch } = props;

  const searchFormRef = React.createRef();

  // 查询表单重置
  const onReset = () => {
    searchFormRef.current.resetFields();
  };
  // 提交信息结构
  const submitSeacherInfo = {
    id: undefined,
    name: undefined,
    useable: undefined,
  };
  // 查询表单提交事件
  const searchFormFinish = values => {
    submitSeacherInfo.id = values.id;
    submitSeacherInfo.name = values.name;
    if (values.useable == '0') {
      submitSeacherInfo.useable = true;
    } else if (values.useable == '1') {
      submitSeacherInfo.useable = false;
    }
    console.log('submitSeacherInfo', submitSeacherInfo);
    dispatch({
      type: 'commodityattributes/getAttributes',
      payload: { submitSeacherInfo: submitSeacherInfo },
    });
  };

  return (
    <div>
      <Form {...layout} ref={searchFormRef} onFinish={searchFormFinish}>
        <Row justify="center">
          <Col span={5}>
            <Form.Item label="品牌" name="brandId">
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item label="工业分类" name="categoryId">
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item label="SPU编码" name="spuId">
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item label="SPU名称" name="spuName">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={5}>
            <Form.Item label="商品型号" name="goodsCategory">
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item label="SKU编码" name="skuId">
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item label="SKU状态" name="skuStatu">
              <Select placeholder="请选择" allowClear>
                <Select.Option value="0">全部</Select.Option>
                <Select.Option value="1">未审核</Select.Option>
                <Select.Option value="2">审核中</Select.Option>
                <Select.Option value="3">通过</Select.Option>
                <Select.Option value="4">驳回</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item label="经营部门" name="bumeng">
              <Select placeholder="请选择" allowClear>
                <Select.Option value="0">全部部门</Select.Option>
                <Select.Option value="1">空调部门</Select.Option>
                <Select.Option value="2">厨具部门</Select.Option>
                <Select.Option value="3">电脑部门</Select.Option>
                <Select.Option value="4">影视部门</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={5}>
            <Form.Item label="开始日期" name="startDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item label="结束日期" name="endDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}></Col>
          <Col span={1}></Col>
          <Col span={5}></Col>
        </Row>

        <Row justify="end">
          <Col className="goodsSubmitButton">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
