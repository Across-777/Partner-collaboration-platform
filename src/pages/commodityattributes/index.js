import React from 'react';
import { connect } from 'dva';
import BreadContent from '@/components/BreadContent';
import AttributesModal from './components/AttributesModal';
import {
  Row,
  Col,
  Form,
  Select,
  Button,
  Table,
  Popconfirm,
  Space,
  Input,
} from 'antd';
import AttrCategory from './components/AttrCategory';

const commodityAttributes = props => {
  // 表格列数据
  const columns = [
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      render: (text, record) => [
        <Space key={record.id}>
          <a
            onClick={() => {
              attrTableEditHandler(record, record.createTime);
            }}
          >
            编辑
          </a>
          |
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => attrTableDeleteHandler(record.id, record.useable)}
          >
            <a className="href-oranges">{record.useable ? '恢复' : '作废'}</a>
          </Popconfirm>
          |
          <a
            onClick={() => {
              applicationClassification(record.id);
            }}
            className="href-oranges"
          >
            应用分类
          </a>
        </Space>,
      ],
    },
    {
      title: '属性编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '属性名称',
      dataIndex: 'name',
      key: 'name ',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '是否销售属性',
      dataIndex: 'saleable',
      key: 'saleable',
      render: (text, record) => [
        <Space key={record.id}>{text ? '是' : '否'}</Space>,
      ],
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
    },
    {
      title: '是否可为空',
      dataIndex: 'nullable',
      key: 'nullable',
      render: (text, record) => [
        <Space key={record.id}>{text ? '是' : '否'}</Space>,
      ],
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '是否可搜索',
      dataIndex: 'searchable',
      key: 'searchable',
      render: (text, record) => [
        <Space key={record.id}>{text ? '是' : '否'}</Space>,
      ],
    },
    {
      title: '作废',
      dataIndex: 'useable',
      key: 'useable',
      render: (text, record) => [
        <Space key={record.id}>{text ? '是' : '否'}</Space>,
      ],
    },
  ];

  const {
    data,
    dispatch,
    attributesModalVisible,
    attrValueMoadlVisible,
    attributerecord,

    attrCategoryModalVisible,
  } = props;

  const searchFormRef = React.createRef();

  // 修改表格数据
  const attrTableEditHandler = (record, createTime) => {
    record.createTime = createTime;
    console.log('record', record);
    dispatch({
      type: 'commodityattributes/updateState',
      payload: {
        attributerecord: record,
        attributesModalVisible: true,
      },
    });
  };
  // 废除属性
  const attrTableDeleteHandler = (id, useable) => {
    console.log('attrTableDeleteHandler', id, useable);
    dispatch({ type: 'commodityattributes/deleteAttribute', payload: { id } });
    // 重新查询数据
    dispatch({
      type: 'commodityattributes/getAttributes',
      payload: { submitSeacherInfo: submitSeacherInfo },
    });
  };

  // 查询表单重置
  const onReset = () => {
    searchFormRef.current.resetFields();
  };
  // 提交信息结构
  const submitSeacherInfo = {
    id: undefined,
    name: undefined,
    useable: undefined,
    page: 1,
    size: 10,
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
  // 增加属性
  const addAttributes = () => {
    dispatch({
      type: 'commodityattributes/updateState',
      payload: {
        attributesModalVisible: true,
        attributerecord: {
          id: '',
          name: '',
          unit: '',
          salable: '',
          defaultValue: '',
          nullable: '',
          createTime: '',
          useable: '',
          type: '',
          values: [],
        },
      },
    });
  };

  // 更新attributesModalVisible,关闭modal
  const closeAttributesModal = () => {
    dispatch({
      type: 'commodityattributes/updateState',
      payload: { attributesModalVisible: false },
    });
  };
  // 提交AttributesModal中表单数据
  const submitFormInfoHandler = values => {
    // console.log('submitFormInfoHandler22222222',values);
    values.createTime = attributerecord.createTime;
    dispatch({
      type: 'commodityattributes/addOrEditAttribute',
      payload: { values },
    });
    // 重新查询数据
    dispatch({
      type: 'commodityattributes/getAttributes',
      payload: { submitSeacherInfo: submitSeacherInfo },
    });
  };

  // ----------------------AttrValueMoadl function 属性可选值弹出框方法----------------------------
  // 打开AttrValueMoadl
  const openAttrValueMoadl = () => {
    dispatch({
      type: 'commodityattributes/updateState',
      payload: { attrValueMoadlVisible: true },
    });
  };
  // 关闭AttrValueMoadl
  const closeAttrValueMoadl = () => {
    dispatch({
      type: 'commodityattributes/updateState',
      payload: { attrValueMoadlVisible: false },
    });
  };
  // 属性可选值提交数据方法
  const attrValuesSubmitHandler = values => {
    let record = { ...attributerecord };
    record.values = values;
    // console.log('..............', record);
    dispatch({
      type: 'commodityattributes/updateState',
      payload: {
        attributerecord: record,
      },
    });
  };

  // ++++++++++++++++++++++++++++++attrCategory Modal 方法+++++++++++++++++++++++++++++
  // 查看属性所属应用分类
  const applicationClassification = id => {
    console.log('applicationClassification', id);
    // 打开AttrCategory 展示数据
    openAttrCategoryModal();
    // 发送请求获取 属性所属属性组和工业分类
    // 未完成
    // dispatch({ type: 'commodityattributes/deleteAttribute', payload: { id } });
  };

  // 打开AttrCategory
  const openAttrCategoryModal = () => {
    dispatch({
      type: 'commodityattributes/updateState',
      payload: { attrCategoryModalVisible: true },
    });
  };
  // 关闭AttrCategory
  const closeAttrCategoryModal = () => {
    dispatch({
      type: 'commodityattributes/updateState',
      payload: { attrCategoryModalVisible: false },
    });
  };

  return (
    <BreadContent>
      <div>
        <Row className="search_tip">
          <Col>查询条件</Col>
        </Row>
        <Form ref={searchFormRef} onFinish={searchFormFinish}>
          <Row justify="end">
            <Col span={5}>
              <Form.Item label="属性编码" name="id">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item label="属性名称" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item label="是否作废" name="useable">
                <Select placeholder="请选择" allowClear>
                  <Select.Option value="0">否</Select.Option>
                  <Select.Option value="1">是</Select.Option>
                  <Select.Option value="2">全部</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item label="系统来源" name="sys">
                <Select
                  placeholder="请选择"
                  allowClear
                  style={{ width: '100%' }}
                >
                  <Select.Option value="1">全部</Select.Option>
                  <Select.Option value="2">五星</Select.Option>
                  <Select.Option value="3">京东</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row className="table_txt">
            <Col span={18}>
              <div className="table_txt_div">商品属性</div>
            </Col>
            <Col span={6}>
              <Button
                className="table_txt_butt"
                htmlType="button"
                onClick={addAttributes}
              >
                新增
              </Button>
            </Col>
          </Row>
        </Form>
        <div>
          <Table
            bordered={true}
            columns={columns}
            dataSource={data.content}
            rowKey="id"
          />
        </div>

        <AttributesModal
          attributesModalVisible={attributesModalVisible}
          closeAttributesModal={closeAttributesModal}
          attributerecord={attributerecord}
          submitFormInfoHandler={submitFormInfoHandler}
          attrValueMoadlVisible={attrValueMoadlVisible}
          openAttrValueMoadl={openAttrValueMoadl}
          closeAttrValueMoadl={closeAttrValueMoadl}
          attrValuesSubmitHandler={attrValuesSubmitHandler}
        ></AttributesModal>

        <AttrCategory
          attrCategoryModalVisible={attrCategoryModalVisible}
          closeAttrCategoryModal={closeAttrCategoryModal}
        ></AttrCategory>
      </div>
    </BreadContent>
  );
};

export default connect(({ commodityattributes }) => commodityattributes)(
  commodityAttributes,
);
