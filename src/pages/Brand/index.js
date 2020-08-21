import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import BreadContent from '../../components/BreadContent';
import BrandModal from './components/BrandModal';
import {
  Row,
  Col,
  Form,
  Select,
  Button,
  Table,
  Pagination,
  Modal,
  Popconfirm,
  Space,
  Input,
  DatePicker,
} from 'antd';

// 提交信息结构
const submitInfo = {
  brandName: undefined,
  status: undefined,
  page: 1,
  size: 10,
};

const Brand = props => {
  const { data, dispatch } = props;
  // 表格列 数据
  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作人',
      dataIndex: 'operator_name',
      key: 'operator_name',
    },
    {
      title: '操作时间',
      dataIndex: 'operate_time',
      key: 'operate_time',
    },
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      render: (text, record) => [
        <Space>
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteHandler(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>,
      ],
    },
  ];

  const [form] = Form.useForm();

  // 使用hook
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);
  // 表格修改数据事件
  const editHandler = record => {
    setModalVisible(true);
    // console.log(record);
    setRecord(record);
  };

  const addHandler = () => {
    setRecord(undefined);
    setModalVisible(true);
  };
  // 表格删除数据事件
  const deleteHandler = id => {
    // 删除数据
    dispatch({ type: 'brand/deleteBrand', payload: { id } });
    // 重新查询数据
    dispatch({
      type: 'brand/getBrandInfo',
      payload: { submitInfo: submitInfo },
    });
  };

  // 信息表单提交事件
  const fromFinishHandler = values => {
    let id = undefined;
    if (record) {
      id = record.id;
    }
    // 添加或者修改数据
    dispatch({ type: 'brand/addOrEditBrand', payload: { id, values } });
    // 重新查询数据
    dispatch({
      type: 'brand/getBrandInfo',
      payload: { submitInfo: submitInfo },
    });
  };

  // 查询表单提交事件
  const searchFormFinish = values => {
    submitInfo.page = 1;
    submitInfo.size = 10;
    submitInfo.brandName = values.brandName;
    submitInfo.status = values.status;
    dispatch({
      type: 'brand/getBrandInfo',
      payload: { submitInfo: submitInfo },
    });
  };
  // 重置form 输入框方法
  const onReset = () => {
    form.resetFields();
  };

  // 切换页码事件
  const pageChangeHandle = (page, pageSize) => {
    submitInfo.page = page;
    submitInfo.size = pageSize;
    console.log('page onchange');
    dispatch({
      type: 'brand/getBrandInfo',
      payload: { submitInfo: submitInfo },
    });
  };

  // 修改modal的visible属性为false
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <BreadContent>
      <div>
        <Row className="search_tip">
          <Col>查询条件</Col>
        </Row>
        <Form form={form} onFinish={searchFormFinish}>
          <Row>
            <Col span={6}>
              <Form.Item label="品牌名称" name="brandName">
                <Input style={{ width: '80%' }} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="状态" name="status">
                <Select
                  placeholder="请选择"
                  allowClear
                  style={{ width: '80%' }}
                >
                  <Select.Option value="1">待确认</Select.Option>
                  <Select.Option value="2">成功</Select.Option>
                  <Select.Option value="3">失败</Select.Option>
                  <Select.Option value="4">取消</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button htmlType="button" onClick={addHandler}>
                新增
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="table_txt">品牌确认</div>
        <div>
          <Table
            columns={columns}
            dataSource={data.data.content}
            rowKey="id"
            pagination={{
              defaultCurrent: 1,
              total: `${data.data.total}`,
              pageSize: `${data.data.size}`,
              current: `${data.data.page}`,
              onChange: pageChangeHandle,
            }}
          />
        </div>
        <BrandModal
          modalVisible={modalVisible}
          record={record}
          closeModal={closeModal}
          fromFinishHandler={fromFinishHandler}
        ></BrandModal>
      </div>
    </BreadContent>
  );
};

export default connect(({ brand }) => brand)(Brand);
