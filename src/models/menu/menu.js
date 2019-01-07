import { getAllMenu } from '../../services/example';

export default {

  namespace: 'menu',

  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history }) { 
      console.log('loading menu...');
      const data = dispatch({type: 'getAllMenu'})
      data.then(function (result) { dispatch({type:'save', payload: result}) });
    },
  },

  effects: {
    *getAllMenu({ payload }, { call, put }) { 
      const menu = yield call(getAllMenu);
      return menu;
    },
  },

  reducers: {
    save(state, action) {
      console.log(action)
      return { ...state, menu: action.payload.data};
    },
  },

};
