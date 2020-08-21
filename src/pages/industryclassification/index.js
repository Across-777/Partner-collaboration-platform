import React from 'react';
import { connect } from 'dva';
import BreadContent from '@/components/BreadContent';
import {
  Row,
  Col,
  Form,
  Select,
  Button,
  Table,
  Modal,
  Popconfirm,
  Space,
  Input,
  DatePicker,
  Collapse,
} from 'antd';
import SearchTree from './components/SearchTree';
import EditGroupModal from './components/EditGroupModal';
import BindAttrModal from './components/BindAttrModal';
import PreviewModal from './components/PreviewModal';

const { Panel } = Collapse;
const industryClassification = props => {
  // 属性组表格列名称
  const groupColumns = [
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      width: '30%',
      render: (text, record) => [
        <Space key={record.id}>
          <a
            onClick={() => {
              editGroupHandler(record);
            }}
          >
            编辑
          </a>
          |
          <a
            onClick={() => {
              bindAttrHandler(record);
            }}
          >
            绑定属性
          </a>
          |<a>复制到</a>|
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteGroupHandler(record.id)}
          >
            <a className="href-oranges">删除</a>
          </Popconfirm>
        </Space>,
      ],
    },
    {
      title: '属性组编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '属性组名称',
      dataIndex: 'name',
      key: 'attribute_name ',
    },
    {
      title: '顺序',
      dataIndex: 'sort',
      key: 'sort',
    },
  ];
  // 属性表格列名称
  const attrColumns = [
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
      title: '是否销售属性',
      dataIndex: 'saleable',
      key: 'saleable ',
      render: (text, record) => [
        <Space key={record.id}>{text ? '是' : '否'}</Space>,
      ],
    },
    {
      title: '输入类型',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => [
        <Space key={record.id}>
          {text == 0
            ? '文本输入框'
            : text == 1
            ? '单选下拉'
            : text == 2
            ? '复选框'
            : '时间控件'}
        </Space>,
      ],
    },
    {
      title: '可选值',
      dataIndex: 'values',
      key: 'values ',
      render: (text, record) => [
        <Space key={record.id}>
          {JSON.stringify(
            text.map(item => {
              return item.valueName;
            }),
          )}
        </Space>,
      ],
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operator',
    //   key: 'operator',
    //   render: (text, record) => [
    //     <Space key={record.id}>
    //       <a
    //         onClick={() => {
    //           editHandler(record);
    //         }}
    //       >
    //         编辑
    //       </a>
    //     </Space>,
    //   ],
    // },
  ];

  const {
    data,
    attrData,
    dispatch,
    groupRecord,
    editGroupModalVisible,

    groupId,
    groupName,
    BindAttrModalVisible,
    allAttrData,
    selectedRowKey,

    treeChildrenData,
    treeData,
    categoryId,
    categoryName,

    previewModalVisible,
    previewAttrData,
  } = props;
  // ------------------本页面函数-------------------
  // 预览属性组 属性处理函数
  const previewHandler = () => {
    dispatch({
      type: 'industryclassification/findPreviewAttr',
      payload: { groupInfo: data.content, previewModalVisible: true },
    });
  };
  // 增加属性组
  const addGroupHandler = () => {
    dispatch({
      type: 'industryclassification/updateState',
      payload: {
        editGroupModalVisible: true,
        groupRecord: { id: '', name: '', sort: '', attrArr: [] },
      },
    });
  };
  // 修改属性组
  const editGroupHandler = record => {
    dispatch({
      type: 'industryclassification/updateState',
      payload: {
        editGroupModalVisible: true,
        groupRecord: record,
      },
    });
  };
  // 删除属性组
  const deleteGroupHandler = id => {
    dispatch({
      type: 'industryclassification/deleteGroupByGroupId',
      payload: { id },
    });
  };
  // 绑定属性
  const bindAttrHandler = record => {
    dispatch({
      type: 'industryclassification/bindAttrHandler',
      payload: {
        BindAttrModalVisible: true,
        groupName: record.name,
        groupId: record.id,
        attrArr: record.attrArr,
      },
    });
  };
  // --------------------SearchTree  funtion ----------------------
  // 通过一级id 查询 二级信息
  const getChildrenData = (id, treeData) => {
    //通过id查询子节点信息，
    dispatch({
      type: 'industryclassification/getChildrenInfo',
      payload: { id, treeData },
    });
  };
  // 点击工业节点，查询所工业分类绑定的属性组
  const onSelectTreeNode = (value, node) => {
    // console.log(node.node.key, node.node.title);
    dispatch({
      type: 'industryclassification/getGroupInfo',
      payload: {
        categoryId: node.node.key,
        categoryName: node.node.title,
      },
    });
  };
  // --------------------BindAttrModal  funtion ----------------------
  // 关闭 BindAttrModal 弹出框
  const closeBindAttrModal = () => {
    dispatch({
      type: 'industryclassification/updateState',
      payload: { BindAttrModalVisible: false },
    });
  };
  // BindAttrModal查询属性表单提交事件
  const searchAttrFormFinish = values => {
    console.log('index.js -> searchAttrFormFinish', values);
    dispatch({
      type: 'industryclassification/findAttrByNameOrId',
      payload: { attrId: values.id, attrName: values.name },
    });
  };
  // 修改 selectedRowKeys 值
  const changeSelectedRowKeys = listKeys => {
    dispatch({
      type: 'industryclassification/updateState',
      payload: { selectedRowKey: listKeys },
    });
  };
  // 绑定组件点击确认事件 -> 属性组绑定属性
  const clickOkHandler = selectedRowKey => {
    // console.log(groupId,selectedRowKey,);
    dispatch({
      type: 'industryclassification/changeBindAttr',
      payload: { groupId, attrArr: selectedRowKey },
    });
  };
  // -------------------EditGroupModal  funtion ----------------------
  // 关闭  EditGroupModal 弹出框
  const closeEditGroupModal = () => {
    dispatch({
      type: 'industryclassification/updateState',
      payload: { editGroupModalVisible: false },
    });
  };
  // EditGroupModal中表单提交事件
  const editGroupFormFinish = values => {
    console.log('index.js -> editGroupFormFinish', values);
    dispatch({
      type: 'industryclassification/addOrEditGroup',
      payload: { categoryId, values, attrArr: groupRecord.attrArr },
    });
  };

  // -------------------PreviewModal  funtion ----------------------
  // 关闭  PreviewModal 弹出框
  const closePreviewModal = () => {
    dispatch({
      type: 'industryclassification/updateState',
      payload: { previewModalVisible: false },
    });
  };

  return (
    <BreadContent>
      <Row>
        <Col span={4}>
          <SearchTree
            treeData={treeData}
            getChildrenData={getChildrenData}
            treeChildrenData={treeChildrenData}
            onSelectTreeNode={onSelectTreeNode}
          ></SearchTree>
        </Col>
        <Col span={20}>
          <Row className="table_txt">
            <Col span={18}>
              <div className="table_txt_div">{categoryName}商品组</div>
            </Col>
            <Col span={6}>
              <Button
                className="table_txt_butt"
                htmlType="button"
                disabled={categoryId == '' ? true : false}
                onClick={previewHandler}
              >
                预览
              </Button>
              <Button
                className="table_txt_butt"
                disabled={categoryId == '' ? true : false}
                htmlType="button"
                onClick={addGroupHandler}
              >
                新增
              </Button>
            </Col>
          </Row>

          <div>
            <Table
              onRow={record => {
                return {
                  // 点击行 事件
                  onClick: event => {
                    dispatch({
                      type: 'industryclassification/findAttrByGroupId',
                      payload: {
                        groupName: record.name,
                        groupId: record.id,
                        attrArr: record.attrArr,
                      },
                    });
                  },
                  // 双击行 事件
                  // onDoubleClick: event => {
                  //   // console.log('record', record);
                  //   // 更新 groupName ,查询属性组拥有属性
                  //   dispatch({
                  //     type: 'industryclassification/findAttrByGroupId',
                  //     payload: {
                  //       groupName: record.name,
                  //       groupId: record.id,
                  //       attrArr: record.attrArr
                  //     },
                  //   });
                  // },
                };
              }}
              bordered={true}
              columns={groupColumns}
              dataSource={data.content}
              rowKey="id"
              pagination={{}}
            />
          </div>
          {/* group's attributes 默认打开*/}
          {groupName && (
            <Collapse defaultActiveKey={['1']}>
              <Panel header={groupName + ' 属性组属性详情'} key="1">
                <Table
                  bordered={true}
                  columns={attrColumns}
                  dataSource={attrData.content}
                  rowKey="id"
                />
              </Panel>
            </Collapse>
          )}
          {/* 新增编辑modal EditGroupModal*/}
          <EditGroupModal
            groupRecord={groupRecord}
            editGroupModalVisible={editGroupModalVisible}
            closeEditGroupModal={closeEditGroupModal}
            editGroupFormFinish={editGroupFormFinish}
          />
          {/* 绑定modal */}
          <BindAttrModal
            groupName={groupName}
            allAttrData={allAttrData}
            BindAttrModalVisible={BindAttrModalVisible}
            closeBindAttrModal={closeBindAttrModal}
            searchAttrFormFinish={searchAttrFormFinish}
            selectedRowKey={selectedRowKey}
            changeSelectedRowKeys={changeSelectedRowKeys}
            clickOkHandler={clickOkHandler}
          />
          {/* 预览modal */}
          <PreviewModal
            previewModalVisible={previewModalVisible}
            closePreviewModal={closePreviewModal}
            previewAttrData={previewAttrData}
          />
        </Col>
      </Row>
    </BreadContent>
  );
};

export default connect(({ industryclassification }) => industryclassification)(
  industryClassification,
);
