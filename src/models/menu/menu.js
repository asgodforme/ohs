import { getAllMenu, getUser } from '../../services/example';


export default {

  namespace: 'menu',

  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history }) {
      const data = dispatch({type: 'getAllMenu'})
      data.then(function (result) {dispatch({type:'save', payload: result}) });
      const userData = dispatch({type: 'getUser'})
      userData.then((result) => 
        {
          dispatch({type:'saveUser', payload: result})
        })
    },
  },

  effects: {
    *getAllMenu({ payload }, { call, put }) { 
      const menu = yield call(getAllMenu);
      return menu;
    },
    *getUser({ payload }, { call, put }) { 
      const user = yield call(getUser);
      return user;
    },
    *saveLoginUser({payload}, {call, put}) {
      console.log(payload);
      yield put({ type: 'saveLogin4User', payload: payload});
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, menu: action.payload.data};
    },
    saveUser(state, action) {
      return { ...state, user: action.payload.data.name};
    },
    saveLogin4User(state, action) {
      return { ...state, user: action.payload.name};
    }
  },

};
