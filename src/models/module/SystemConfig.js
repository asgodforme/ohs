import { getAllSys, saveSysConfig, deleteById, updateById } from '../../services/example';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'systemConfig',

    state: {
        systemConfig: {
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
        *getAllSys({ payload }, { call, put }) {
            const result = yield call(getAllSys, payload);
            if (result.data.status === 500) {
                error(result.data.statusText);
            } else {
                yield put({ type: 'save', payload: result });
                yield put({ type: 'saveQueryParm', payload: payload });
            }
        },
        *saveSysConfig({ payload }, { call, put }) {
            const result = yield call(saveSysConfig, payload);
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
            return { ...state, systemConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.systemConfig.content, action.payload];
            let totalElements = state.systemConfig.totalElements;
            return Object.assign({}, state, { systemConfig: Object.assign({}, state.systemConfig, { content: listData, totalElements: totalElements + 1 }) })
        },
        delete(state, action) {
            let totalElements = state.systemConfig.totalElements;
            let number = 0;
            if (totalElements > state.systemConfig.size) {
                number = (totalElements - 1) % state.systemConfig.size === 0 ? state.systemConfig.number - 1 : state.systemConfig.number;
            } else {
                number = state.systemConfig.number;
            }
            return Object.assign({}, state, { systemConfig: Object.assign({}, state.systemConfig, { content: state.systemConfig.content.filter(sys => sys.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.systemConfig.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { systemConfig: Object.assign({}, state.systemConfig, { content: listData }) });
        }
    },

};
