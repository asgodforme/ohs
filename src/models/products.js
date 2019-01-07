import { getAllMenu } from '../services/example';

export default {
  namespace: 'products1',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    save(state, action) {
      console.log(1);
      console.log(state);
      console.log(action.payload.data)
      return state.concat(action.payload.data);
    },
    
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(getAllMenu);
      return data;
    },
  },

  subscriptions: {
    setup({ dispatch, history }) { 
      // console.log('loading...');
      // const data = dispatch({type: 'fetch'})
      // console.log(data.then(function (result) { console.log(result) }));
      // console.log(data.then(function (result) { dispatch({type:'save', payload: result}) }))
    },
  },
  
};