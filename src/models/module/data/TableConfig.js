import { getAllTable, saveTableConfig, deleteById, updateById } from '../../../services/data/tableConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'tableConfig',

    state: {
        allSys: [],
        tableConfig: [],

    },

    subscriptions: {
        setup({ dispatch, history }) {
            
        },
    },

    effects: {
        *getAllTable({ payload }, { call, put }) {
            const tableCfg = yield call(getAllTable, payload);
            if (tableCfg.data.status === 500) {
                error(tableCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: tableCfg });
            }
        },
        *saveTableConfig({ payload }, { call, put }) {
            const result = yield call(saveTableConfig, payload);
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
            return { ...state, tableConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.tableConfig, action.payload];
            return Object.assign({}, state, { tableConfig: listData })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        delete(state, action) {
            return Object.assign({}, state, { tableConfig: state.tableConfig.filter(moduleCfg => moduleCfg.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.tableConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { tableConfig: listData })
        }
    },

};