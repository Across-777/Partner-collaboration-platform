import {
  getAttributesService,
  deleteAttributeService,
  addOrEditAttributeService,
} from '../services/attributesService';

export default {
  namespace: 'commodityattributes',
  state: {
    attributesModalVisible: false,
    attrValueMoadlVisible: false,
    attrCategoryModalVisible: false,
    attributerecord: {},
    data: {
      success: '',
      message: '',
      content: [
        {
          id: '2',
          name: '内存',
          unit: ' ',
          saleable: '1',
          defaultValue: '无',
          nullable: '1',
          createTime: '2020-07-07',
          useable: '1',
          type: '2',
          searchable: '1',
          values: [
            {
              id: 1,
              valueName: '是',
            },
            {
              id: 2,
              valueName: '否',
            },
          ],
        },
        {
          id: '3',
          name: '保修',
          unit: ' ',
          saleable: '1',
          defaultValue: '无',
          nullable: '0',
          createTime: '2020-07-07',
          useable: '1',
          type: '3',
          searchable: '1',
          values: [
            {
              id: 1,
              valueName: '粉色',
            },
            {
              id: 2,
              valueName: '黑色',
            },
          ],
        },
      ],
      total: 1,
      page: 1,
      size: 10,
    },
  },
  effects: {
    // 根据查询条件，更改数据源
    *getAttributes({ payload }, { call, select, put }) {
      // console.log('getAttributes123',payload);
      let { data } = yield call(
        getAttributesService,
        payload.submitSeacherInfo,
      );
      yield put({ type: 'updateState', payload: { data } });
    },
    // 根据 id 删除数据
    *deleteAttribute({ payload }, { call, select, put }) {
      // console.log('deleteAttributeService id',payload.id);
      console.log('delete');
      let { data } = yield call(deleteAttributeService, payload.id);
      console.log('delete data', data);
    },
    // 增加或修改数据
    *addOrEditAttribute({ payload }, { call, select, put }) {
      console.log('addOrEditAttributeService', payload.values);
      let { data } = yield call(addOrEditAttributeService, payload.values);
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
    // 当监听到pathname===/option时，执行初始化数据方法
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/commodityattributes') {
          dispatch({
            type: 'getAttributes',
            payload: {
              submitSeacherInfo: {
                // page: 1,
                // size: 10,
              },
            },
          });
        }
      });
    },
  },
};
