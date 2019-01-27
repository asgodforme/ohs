import { getAllUser, saveUserConfig, deleteById, updateById } from '../../services/userConfig';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'userConfig',

    state: {
        allSys: [],
        userConfig: {
            content: [],
            number: 0,
            totalElements: 0,
            size: 8,
        }

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
                yield put({ type: 'saveQueryParm', payload: payload });
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
            const result = yield call(deleteById, payload.id);
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
        saveQueryParm(state, action) {
            return { ...state, queryParm: action.payload };
        },
        save(state, action) {
            return { ...state, userConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.userConfig.content, action.payload];
            let totalElements = state.userConfig.totalElements;
            return Object.assign({}, state, { userConfig: Object.assign({}, state.userConfig, { content: listData, totalElements: totalElements + 1 }) })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        delete(state, action) {
            let totalElements = state.userConfig.totalElements;
            let number = 0;
            if (totalElements > state.userConfig.size) {
                number = (totalElements - 1) % state.userConfig.size === 0 ? state.userConfig.number - 1 : state.userConfig.number;
            } else {
                number = state.userConfig.number;
            }
            return Object.assign({}, state, { userConfig: Object.assign({}, state.userConfig, { content: state.userConfig.content.filter(userCfg => userCfg.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.userConfig.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { userConfig: Object.assign({}, state.userConfig, { content: listData }) })
        }
    },

};
