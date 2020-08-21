import {
  initBrandService,
  getBrandService,
  deleteBrandService,
  addOrEditBrandService,
} from '../services/brandService';

export default {
  namespace: 'brand',
  state: {
    value: 0,
    data: {
      data: {
        content: [
          {
            id: '1',
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          },
        ],
        total: 1,
        page: 1,
        size: 10,
      },
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
        if (pathname === '/option') {
          dispatch({
            type: 'initBrandInfo',
          });
        }
      });
    },
  },
};
