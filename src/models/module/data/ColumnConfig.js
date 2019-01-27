import { getAllColumn, saveColumnConfig, deleteById, updateById } from '../../../services/data/columnConfig';
import { getAllSysWhenInit } from '../../../services/moduleConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'columnConfig',

    state: {
        allSys: [],
        columnConfig: {
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
            //     dispatch({ type: 'tableConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'enumValueConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'saveAllSys', payload: result });
            // });
        },
    },

    effects: {
        *getAllSysWhenInit({ payload }, { call, put }) {
            const allSyses = yield call(getAllSysWhenInit, payload);
            yield put({ type: 'saveAllSys', payload: allSyses });
            return allSyses;
        },
        *getAllColumn({ payload }, { call, put }) {
            const columnCfg = yield call(getAllColumn, payload);
            if (columnCfg.data.status === 500) {
                error(columnCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: columnCfg });
                yield put({ type: 'saveQueryParm', payload: payload });
            }
        },
        *getAllTableWhenAdd({ payload }, { call, put }) {
            yield put({ type: 'saveTable', payload: payload });
        },
        *saveColumnConfig({ payload }, { call, put }) {
            console.log(payload);
            const result = yield call(saveColumnConfig, payload);
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
        *deleteTableConfig({ payload }, { put }) {
            yield put({ type: 'deleteOldTableConfig', payload: payload });
        },
    },

    reducers: {
        saveQueryParm(state, action) {
            return { ...state, queryParm: action.payload };
        },
        deleteOldTableConfig(state, action) {
            let allSys = [...state.allSys];
            allSys.map((item) => {
                if (item.ohsTableConfigs != null) {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme) {
                        item.ohsTableConfigs = item.ohsTableConfigs.filter(ohsTableConfig => ohsTableConfig.tableName !== action.payload.tableName && ohsTableConfig.tableChnName !== action.payload.tableChnName);
                    }
                }
                return item;
            });
            return Object.assign({}, state, { allSys: allSys });
        },
        saveTable(state, action) {
            let allSys = [...state.allSys];
            allSys.map((item) => {
                if (item.ohsTableConfigs != null) {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme) {
                        item.ohsTableConfigs = [...item.ohsTableConfigs, { id: action.payload.tableName, schemaName: action.payload.schemaName, tableName: action.payload.tableName, tableChnName: action.payload.tableChnName }];
                    }
                } else {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme) {
                        item.ohsTableConfigs = [{ id: action.payload.tableName, schemaName: action.payload.schemaName, tableName: action.payload.tableName, tableChnName: action.payload.tableChnName }];
                    }
                }
                return item;
            });
            return Object.assign({}, state, { allSys: allSys });
        },
        save(state, action) {
            return { ...state, columnConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.columnConfig.content, action.payload];
            let totalElements = state.columnConfig.totalElements;
            return Object.assign({}, state, { columnConfig: Object.assign({}, state.columnConfig, { content: listData, totalElements: totalElements + 1 }) })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            let totalElements = state.columnConfig.totalElements;
            let number = 0;
            if (totalElements > state.columnConfig.size) {
                number = (totalElements - 1) % state.columnConfig.size === 0 ? state.columnConfig.number - 1 : state.columnConfig.number;
            } else {
                number = state.columnConfig.number;
            }
            return Object.assign({}, state, { columnConfig: Object.assign({}, state.columnConfig, { content: state.columnConfig.content.filter(columnCfg => columnCfg.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.columnConfig.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { columnConfig: Object.assign({}, state.columnConfig, { content: listData }) })
        },
        deleteSysDelSys(state, action) {
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
        },
    },

};
