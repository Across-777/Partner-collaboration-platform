import { updateTreeData, dealChild } from '../utils/dealData';
import { message } from 'antd';
import {
  getChildrenInfoService,
  getGroupInfoService,
  deleteGroupService,
  addOrEditGroupService,
  changeBindAttrService,
} from '../services/classificationService';
import {
  findAttrByGroupIdService,
  getAttributesService,
  findPreviewAttrService,
} from '../services/attributesService';
export default {
  namespace: 'industryclassification',
  state: {
    editGroupModalVisible: false,
    groupRecord: {},

    BindAttrModalVisible: false,
    groupId: '',
    groupName: '',
    selectedRowKey: [],

    previewModalVisible: false,
    treeData: [],
    treeChildrenData: [],
    categoryId: '',
    categoryName: '',
    data: {
      content: [],
    },
    attrData: {
      content: [],
    },
    allAttrData: {
      content: [],
    },
    previewAttrData: {
      content: [{ name: '属性组1', attrArr: [{ name: '单选测试-内存' }] }],
    },
  },
  effects: {
    // 初始化 工业树 数据,并将展示数据清空
    *initTree({ payload }, { call, select, put }) {
      let tree = yield call(getChildrenInfoService, payload.id);
      let realTree = dealChild(tree.data);
      yield put({
        type: 'updateState',
        payload: {
          treeData: realTree,
          data: {},
          attrData: {},
          allAttrData: {},
          groupName: '',
          categoryName: '',
        },
      });
    },

    // 根据查询条件 查询children数据，并保存
    *getChildrenInfo({ payload }, { call, select, put }) {
      let childrenData = yield call(getChildrenInfoService, payload.id);
      let child = dealChild(childrenData.data);
      let newTreeData = updateTreeData(payload.treeData, payload.id, child);
      yield put({ type: 'updateState', payload: { treeData: newTreeData } });
    },

    // 查询所工业分类绑定的属性组
    *getGroupInfo({ payload }, { call, select, put }) {
      // console.log('getGroupInfo',payload.categoryName );
      let { data } = yield call(getGroupInfoService, payload.categoryId);
      yield put({
        type: 'updateState',
        payload: {
          data,
          categoryName: payload.categoryName,
          categoryId: payload.categoryId,
        },
      });
    },

    // 根据 group id 删除属性组
    *deleteGroupByGroupId({ payload }, { call, select, put }) {
      // console.log('payload.id',payload.id);
      let { data } = yield call(deleteGroupService, payload.id);
      if (data.success) {
        message.success('删除成功');
        let categoryId = yield select(
          ({ industryclassification }) => industryclassification.categoryId,
        );
        let { data } = yield call(getGroupInfoService, categoryId);
        yield put({ type: 'updateState', payload: { data } });
      } else {
        message.warning('删除失败');
      }
    },

    // 增加或修改 属性组
    *addOrEditGroup({ payload }, { call, select, put }) {
      // console.log('addOrEditBrand', payload.values);
      let { data } = yield call(
        addOrEditGroupService,
        payload.categoryId,
        payload.values,
        payload.attrArr,
      );
      let titleMessage =
        payload.values.id == '' || payload.values.id == undefined
          ? '新增'
          : '编辑';
      if (data.success) {
        message.success(titleMessage + '成功');
        let { data } = yield call(getGroupInfoService, payload.categoryId);
        yield put({ type: 'updateState', payload: { data } });
      } else {
        message.warning(titleMessage + '失败');
      }
    },
    // 根据 属性组 groupId 查找属性组所拥有的属性
    *findAttrByGroupId({ payload }, { call, select, put }) {
      // console.log('findAttrByGroupId', payload);
      let { data } = yield call(
        findAttrByGroupIdService,
        payload.groupId,
        payload.attrArr,
      );
      yield put({
        type: 'updateState',
        payload: {
          attrData: data,
          groupName: payload.groupName,
        },
      });
    },
    /*
    1.查询所有属性
    2.打开绑定属性modal
    3.获取属性组绑定的属性id数组
     */
    *bindAttrHandler({ payload }, { call, select, put }) {
      // console.log('bindAttrHandler', payload);
      let { data } = yield call(getAttributesService);
      // console.log(payload.attrArr);
      yield put({
        type: 'updateState',
        payload: {
          allAttrData: data,
          BindAttrModalVisible: payload.BindAttrModalVisible,
          selectedRowKey: payload.attrArr,
          groupId: payload.groupId,
        },
      });
    },
    // 根据 属性的编码或名称 查询属性
    *findAttrByNameOrId({ payload }, { call, select, put }) {
      let { data } = yield call(getAttributesService, {
        id: payload.attrId,
        name: payload.attrName,
      });
      // console.log('findAttrByGroupId data', data);
      yield put({ type: 'updateState', payload: { allAttrData: data } });
    },
    // 属性组绑定属性
    *changeBindAttr({ payload }, { call, select, put }) {
      // console.log('----------------------changeBindAttr', payload);
      let { data } = yield call(
        changeBindAttrService,
        payload.groupId,
        payload.attrArr,
      );
      if (data.success) {
        message.success('绑定成功');
        // 成功则重新刷新页面
        let categoryId = yield select(
          ({ industryclassification }) => industryclassification.categoryId,
        );
        let { data } = yield call(getGroupInfoService, categoryId);
        yield put({ type: 'updateState', payload: { data } });
      } else {
        message.warning('绑定失败');
      }
    },
    // 查找所有属性组的属性
    *findPreviewAttr({ payload }, { call, select, put }) {
      // console.log('findPreviewAttr payload', payload);
      let { data } = yield call(findPreviewAttrService, payload.groupInfo);
      console.log('findPreviewAttr data', data);
      yield put({
        type: 'updateState',
        payload: {
          previewAttrData: data,
          previewModalVisible: payload.previewModalVisible,
        },
      });
    },
  },
  reducers: {
    // 更新state
    updateState(state, { payload }) {
      console.log('reducers payload', payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    // 当监听到pathname===/industryclassification 时，执行初始化数据方法
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/industryclassification') {
          // console.log('industryclassification');
          dispatch({
            type: 'initTree',
            payload: { id: 0 },
          });
        }
      });
    },
  },
};
