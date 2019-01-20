import { getAllSys, saveSysConfig, deleteById, updateById } from '../../services/example';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'systemConfig',

    state: {
        systemConfig: []
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
            console.log(payload);
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
        save(state, action) {
            return { ...state, systemConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.systemConfig, action.payload];
            return Object.assign({}, state, { systemConfig: listData })
        },
        delete(state, action) {
            return Object.assign({}, state, { systemConfig: state.systemConfig.filter(sys => sys.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.systemConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { systemConfig: listData })
        }
    },

};
