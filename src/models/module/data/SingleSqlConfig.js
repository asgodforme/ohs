import { getAllSingleSql, saveSingleSqlConfig, deleteById, updateById } from '../../../services/data/singleSqlConfig';
import { getAllSysWhenInit } from '../../../services/moduleConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'singleSqlConfig',

    state: {
        allSys: [],
        singleSqlConfig: [],

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
        *getAllSingleSql({ payload }, { call, put }) {
            const singleSqlCfg = yield call(getAllSingleSql, payload);
            if (singleSqlCfg.data.status === 500 || singleSqlCfg.data.status === 404) {
                error(singleSqlCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: singleSqlCfg });
            }
        },
        *getAllTableWhenAdd({ payload }, { call, put }) {
            yield put({ type: 'saveTable', payload: payload });
        },
        *saveSingleSqlConfig({ payload }, { call, put }) {
            console.log(payload);
            const result = yield call(saveSingleSqlConfig, payload);
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
        *saveModuleConfig({ payload }, { put }) {
            yield put({ type: 'saveNewModuleConfig', payload: payload });
        },
        *deleteModuleConfig({ payload }, { put }) {
            yield put({ type: 'deleteOldModuleConfig', payload: payload });
        },
        *saveColumnCfg({ payload }, { put }) {
            yield put({ type: 'saveNewColumnConfig', payload: payload });
        },
        *deleteColumnConfig({ payload }, { put }) {
            yield put({ type: 'deleteOldColumnConfig', payload: payload });
        },
    },

    reducers: {
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
        deleteOldModuleConfig(state, action) {
            console.log(state);
            console.log(action);
            let allSys = [...state.allSys];
            allSys.map((item) => {
                if (item.ohsModuleConfigs != null) {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme) {
                        item.ohsModuleConfigs = item.ohsModuleConfigs.filter(ohsModuleConfig => ohsModuleConfig.moduleName !== action.payload.moduleName && ohsModuleConfig.moduleAlias !== action.payload.moduleAlias);
                    }
                } 
                return item;
            });
            return Object.assign({}, state, { allSys: allSys });
        },
        saveNewModuleConfig(state, action) {
            console.log(state)
            console.log(action)
            let allSys = [...state.allSys];
            allSys.map((item) => {
                if (item.ohsModuleConfigs != null) {
                    if (item.sysAlias === action.payload.sysAlias && item.sysChineseNme === action.payload.sysChineseNme) {
                        item.ohsModuleConfigs = [...item.ohsModuleConfigs, { id: action.payload.moduleAlias, moduleAlias: action.payload.moduleAlias, moduleName: action.payload.moduleName }];
                    }
                } else {
                    item.ohsModuleConfigs = [{ id: action.payload.moduleAlias, moduleAlias: action.payload.moduleAlias, moduleName: action.payload.moduleName }]
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
                        item.ohsTableConfigs = [...item.ohsTableConfigs, { id: action.payload.tableName, schemaName: action.payload.schemaName, tableName: action.payload.tableName }];
                    }
                } else {
                    item.ohsTableConfigs = [{ id: action.payload.tableName, schemaName: action.payload.schemaName, tableName: action.payload.tableName }];
                }
                return item;
            });
            return Object.assign({}, state, { allSys: allSys });
        },
        save(state, action) {
            return { ...state, singleSqlConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.singleSqlConfig, action.payload];
            return Object.assign({}, state, { singleSqlConfig: listData })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            return Object.assign({}, state, { singleSqlConfig: state.singleSqlConfig.filter(moduleCfg => moduleCfg.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.singleSqlConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { singleSqlConfig: listData })
        },
        deleteSysDelSys(state, action) {
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
        },
    },

};
