import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import BreadContent from '@/components/BreadContent';
import SearchCommodityForm from './components/SearchCommodityForm';
import { Row, Col, Button, Table, Pagination, Popconfirm, Space } from 'antd';

const commodityEntry = props => {
  // 表格列数据
  const columns = [
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      fixed: 'left',
      width: 280,
      render: (text, record) => [
        <Space key={record.id}>
          <Popconfirm
            title="Sure to edit?"
            onConfirm={() => editGoodsHandler(record)}
          >
            <a>编辑</a>
          </Popconfirm>
          |
          <a
            className="href-green"
            onClick={() => {
              watchGoodsHandler(record);
            }}
          >
            查看
          </a>
          |
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteGoodsHandler(record)}
          >
            <a className="href-oranges">删除</a>
          </Popconfirm>
          |
          <a
            className="href-oranges"
            onClick={() => {
              watchSkuInfoHandler(record);
            }}
          >
            明细信息
          </a>
          |<a>复制</a>
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
  ];

  const { data, dispatch } = props;

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
    console.log('点击新增商品');
    // dispatch({
    //   type: 'commodityattributes/updateState',
    //   payload: {
    //     attributesModalVisible: true,
    //     attributerecord: {
    //       id: '',
    //       name: '',
    //       unit: '',
    //       salable: '',
    //     },
    //   },
    // });
  };

  return (
    <BreadContent>
      <div>
        <Row className="search_tip">
          <Col>查询条件</Col>
        </Row>
        <SearchCommodityForm />
        <Row className="table_txt">
          <Col span={18}>
            <div className="table_txt_div">商品列表</div>
          </Col>
          <Col span={6}>
            <Button
              className="table_txt_butt"
              htmlType="button"
              onClick={addAttributes}
            >
              <Link to="addCommodity">新增商品</Link>
            </Button>
          </Col>
        </Row>
        <div>
          <Table
            bordered={true}
            columns={columns}
            dataSource={data.content}
            rowKey="id"
            scroll={{ x: 1300 }}
          />
        </div>
      </div>
    </BreadContent>
  );
};

export default connect(({ commodityentry }) => commodityentry)(commodityEntry);
