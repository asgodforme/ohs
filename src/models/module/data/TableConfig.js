import { getAllTable, saveTableConfig, deleteById, updateById } from '../../../services/data/tableConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'
import { getAllSysWhenInit } from '../../../services/moduleConfig';


export default {

    namespace: 'tableConfig',

    state: {
        allSys: [],
        tableConfig: [],

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
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
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
        },
        deleteSysDelSys(state, action) {
            console.log(state)
            console.log(action)
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme ) })
        },

    },

};
