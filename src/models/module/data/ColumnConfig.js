import { getAllColumn, saveColumnConfig, deleteById, updateById } from '../../../services/data/columnConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'columnConfig',

    state: {
        allSys: [],
        columnConfig: [],

    },

    subscriptions: {
        setup({ dispatch, history }) {
            
        },
    },

    effects: {
        *getAllColumn({ payload }, { call, put }) {
            const columnCfg = yield call(getAllColumn, payload);
            if (columnCfg.data.status === 500) {
                error(columnCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: columnCfg });
            }
        },
        *saveColumnConfig({ payload }, { call, put }) {
            const result = yield call(saveColumnConfig, payload);
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
        },
        *getAllSysWhenSysAdd({ payload }, { call, put }) {
            yield put({ type: 'saveSys', payload: payload });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, columnConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.columnConfig, action.payload];
            return Object.assign({}, state, { columnConfig: listData })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            return Object.assign({}, state, { columnConfig: state.columnConfig.filter(moduleCfg => moduleCfg.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.columnConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { columnConfig: listData })
        }
    },

};
