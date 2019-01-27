import { getAllTable, saveTableConfig, deleteById, updateById } from '../../../services/data/tableConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'
import { getAllSysWhenInit } from '../../../services/moduleConfig';


export default {

    namespace: 'tableConfig',

    state: {
        allSys: [],
        tableConfig: {
            content: [],
            number: 0,
            totalElements: 0,
            size: 5,
        },

    },

    subscriptions: {
        setup({ dispatch, history }) {
            // 同一加载
            // const data = dispatch({ type: 'getAllSysWhenInit', payload: { sysAlias: '', sysChineseNme: '' } });
            // data.then(function (result) {
            //     dispatch({ type: 'userConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'evnConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'saveAllSys', payload: result });
            //     dispatch({ type: 'enumValueConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'columnConfig/saveAllSys', payload: result });
            // });
        },
    },

    effects: {
        *getAllSysWhenInit({ payload }, { call, put }) {
            const allSyses = yield call(getAllSysWhenInit, payload);
            yield put({ type: 'saveAllSys', payload: allSyses });
            return allSyses;
        },
        *getAllTable({ payload }, { call, put }) {
            const tableCfg = yield call(getAllTable, payload);
            if (tableCfg.data.status === 500) {
                error(tableCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: tableCfg });
                yield put({ type: 'saveQueryParm', payload: payload });
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
        },
        *getAllSysWhenSysAdd({ payload }, { call, put }) {
            yield put({ type: 'saveSys', payload: payload });
        },
        *deleteSys({ payload }, { call, put }) {
            yield put({ type: 'deleteSysDelSys', payload: payload });
        },
    },

    reducers: {
        saveQueryParm(state, action) {
            return { ...state, queryParm: action.payload };
        },
        save(state, action) {
            return { ...state, tableConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.tableConfig.content, action.payload];
            let totalElements = state.tableConfig.totalElements;
            return Object.assign({}, state, { tableConfig: Object.assign({}, state.tableConfig, { content: listData, totalElements: totalElements + 1 }) })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            let totalElements = state.tableConfig.totalElements;
            let number = 0;
            if (totalElements > state.tableConfig.size) {
                number = (totalElements - 1) % state.tableConfig.size === 0 ? state.tableConfig.number - 1 : state.tableConfig.number;
            } else {
                number = state.tableConfig.number;
            }
            return Object.assign({}, state, { tableConfig: Object.assign({}, state.tableConfig, { content: state.tableConfig.content.filter(tableCfg => tableCfg.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.tableConfig.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { tableConfig: Object.assign({}, state.tableConfig, { content: listData }) })
        },
        deleteSysDelSys(state, action) {
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
        },

    },

};
