import { getAllUser, saveUserConfig, deleteById, updateById } from '../../services/userConfig';
import { getAllSys } from '../../services/moduleConfig';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'userConfig',

    state: {
        allSys: [],
        userConfig: [],

    },

    subscriptions: {
        setup({ dispatch, history }) {
           
        },
    },

    effects: {
        *getAllUser({ payload }, { call, put }) {
            const userCfg = yield call(getAllUser, payload);
            if (userCfg.data.status === 500) {
                error(userCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: userCfg });
            }
        },
        *saveUserConfig({ payload }, { call, put }) {
            const result = yield call(saveUserConfig, payload);
            if (result.data.status === 500) {
                error(result.data.statusText);
            } else {
                success("新增成功！");
                yield put({ type: 'saveOne', payload: result.data });
            }
        },
        *deleteById({ payload }, { call, put }) {
            const result = yield call(deleteById, payload);
            if (result.data.status === 500) {
                error(result.data.statusText);
            } else {
                success("删除成功！");
                yield put({ type: 'delete', payload: result.data });
            }
        },
        *updateById({ payload }, { call, put }) {
            const result = yield call(updateById, payload);
            if (result.data.status === 500) {
                error(result.data.statusText);
            } else {
                success("更新成功！");
                yield put({ type: 'update', payload: result.data });
            }
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, userConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.userConfig, action.payload];
            return Object.assign({}, state, { userConfig: listData })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        delete(state, action) {
            return Object.assign({}, state, { userConfig: state.userConfig.filter(moduleCfg => moduleCfg.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.userConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { userConfig: listData })
        }
    },

};
