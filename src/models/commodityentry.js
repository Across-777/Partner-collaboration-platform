import {
  initBrandService,
  getBrandService,
  deleteBrandService,
  addOrEditBrandService,
} from '../services/brandService';

export default {
  namespace: 'commodityentry',
  state: {
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
    // 初始化表格数据
    *initBrandInfo({ payload }, { call, select, put }) {
      const data = yield call(initBrandService);
      yield put({ type: 'updateState', payload: { data: data } });
    },
    // 根据查询条件，更改数据源
    *getBrandInfo({ payload }, { call, select, put }) {
      // console.log('getBrandInfoByInfo');
      const data = yield call(getBrandService, payload.submitInfo);
      yield put({ type: 'updateState', payload: { data: data } });
    },
    // 根据 id 删除数据
    *deleteBrand({ payload }, { call, select, put }) {
      // console.log('payload.id',payload.id);
      const data = yield call(deleteBrandService, payload.id);
    },
    // 增加或修改数据
    *addOrEditBrand({ payload }, { call, select, put }) {
      console.log('addOrEditBrand', payload.values);
      const data = yield call(
        addOrEditBrandService,
        payload.id,
        payload.values,
      );
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
        if (pathname === '/importGoods---') {
          dispatch({
            type: 'initBrandInfo',
          });
        }
      });
    },
  },
};
