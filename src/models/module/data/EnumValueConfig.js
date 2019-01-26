import { getAllEnumValue, saveEnumValueConfig, deleteById, updateById } from '../../../services/data/enumValueConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'
import { getAllSysWhenInit } from '../../../services/moduleConfig';


export default {

    namespace: 'enumValueConfig',

    state: {
        allSys: [],
        enumValueConfig: [],

    },

    subscriptions: {
        setup({ dispatch, history }) {
            // 同一加载
            // const data = dispatch({ type: 'getAllSysWhenInit', payload: { sysAlias: '', sysChineseNme: '' } });
            // data.then(function (result) {
            //     dispatch({ type: 'userConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'evnConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'tableConfig/saveAllSys', payload: result });
            //     dispatch({ type: 'saveAllSys', payload: result });
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
        *getAllEnumValue({ payload }, { call, put }) {
            const enumValueCfg = yield call(getAllEnumValue, payload);
            if (enumValueCfg.data.status === 500) {
                error(enumValueCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: enumValueCfg });
                yield put({ type: 'saveQueryParm', payload: payload });
            }
        },
        *saveEnumValueConfig({ payload }, { call, put }) {
            const result = yield call(saveEnumValueConfig, payload);
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
        *saveColumnConfig({ payload }, { put }) {
            yield put({ type: 'saveNewColumnConfig', payload: payload });
        },
        *deleteColumnConfig({ payload }, { put }) {
            yield put({ type: 'deleteOldColumnConfig', payload: payload });
        },
    },

    reducers: {
        saveQueryParm(state, action) {
            return { ...state, queryParm: action.payload };
        },
        deleteOldColumnConfig(state, action) {
            let allSys = [...state.allSys];
            allSys.map((item) => {
                if (item.ohsTableConfigs != null) {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme && item.schemaName === action.payload.schemaName) {
                        item.ohsTableConfigs.map((table) => {
                            if (table.schemaName === action.payload.schemaName && table.tableName === action.payload.tableName) {
                                if (table.columns != null) {
                                    table.columns = table.columns.filter(column => column.columnName !== action.payload.columnName && column.columnAlias !== action.payload.columnAlias)
                                } 
                            }
                            return table;
                        })
                    }
                }
                return item;
            });
            return Object.assign({}, state, { allSys: allSys });
        },
        saveNewColumnConfig(state, action) {
            let allSys = [...state.allSys];
            allSys.map((item) => {
                if (item.ohsTableConfigs != null) {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme && item.schemaName === action.payload.schemaName) {
                        item.ohsTableConfigs.map((table) => {
                            if (table.schemaName === action.payload.schemaName && table.tableName === action.payload.tableName) {
                                if (table.columns != null) {
                                    table.columns = [...table.columns, { id: action.payload.columnName, columnName: action.payload.columnName, columnAlias: action.payload.columnAlias }]
                                } else {
                                    table.columns = [
                                        {
                                            id: action.payload.columnName, 
                                            columnName: action.payload.columnName, 
                                            columnAlias: action.payload.columnAlias
                                        }
                                    ]
                                }
                            }
                            return table;
                        })
                    }
                } else {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme && item.schemaName === action.payload.schemaName) {
                        item.ohsTableConfigs = [{
                            schemaName: action.payload.schemaName, 
                            tableName: action.payload.tableName,
                            tableChnName: action.payload.tableChnName,
                            columns: [{
                                id: action.payload.columnName, columnName: action.payload.columnName, columnAlias: action.payload.columnAlias
                            }],
                        }];
                    }
                }
                return item;
            });
            return Object.assign({}, state, { allSys: allSys });
        },
        save(state, action) {
            return { ...state, enumValueConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.enumValueConfig, action.payload];
            return Object.assign({}, state, { enumValueConfig: listData })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            return Object.assign({}, state, { enumValueConfig: state.enumValueConfig.filter(moduleCfg => moduleCfg.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.enumValueConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { enumValueConfig: listData })
        },
        deleteSysDelSys(state, action) {
            console.log(state)
            console.log(action)
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
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
        }
    },

};
