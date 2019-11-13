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
      yield put({ type: 'saveLogin4User', payload: payload});
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, menu: action.payload.data};
    },
    saveUser(state, action) {
      let users = [];
      if (action.payload.data.length > 0) {
        for (let i = 0; i < action.payload.data.length; i++) {
          users.push(action.payload.data[i].name);
        }
      }
      if (users.length === 1) {
        return { ...state, users: users, user: users[0]};
      }
      return { ...state, users: users};
    },
    saveLogin4User(state, action) {
      let temp = state.users.filter(user => user !== action.payload.name);
      temp.push(action.payload.name);
      return { ...state, user: action.payload.name, users: temp};
    }
  },

};
