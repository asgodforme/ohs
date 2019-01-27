import { getAllSingleSql, saveSingleSqlConfig, deleteById, updateById } from '../../../services/data/singleSqlConfig';
import { getAllSysWhenInit } from '../../../services/moduleConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'singleSqlConfig',

    state: {
        allSys: [],
        singleSqlConfig: {
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
        *getAllSingleSql({ payload }, { call, put }) {
            const singleSqlCfg = yield call(getAllSingleSql, payload);
            if (singleSqlCfg.data.status === 500 || singleSqlCfg.data.status === 404) {
                error(singleSqlCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: singleSqlCfg });
                yield put({ type: 'saveQueryParm', payload: payload });
            }
        },
        *getAllTableWhenAdd({ payload }, { call, put }) {
            yield put({ type: 'saveTable', payload: payload });
        },
        *saveSingleSqlConfig({ payload }, { call, put }) {
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
            let listData;
            // 新增已经存在的单表sql配置不返回主键
            if (action.payload.id === null || action.payload.id === '') {
                listData = [...state.singleSqlConfig.content];
                // 遍历当前数据域，加新增的字段附加到已经存在的节点上
                listData.map(singleSqlCfg => {
                    if (action.payload.sysAlias === singleSqlCfg.sysAlias
                        && action.payload.sysChineseNme === singleSqlCfg.sysChineseNme
                        && action.payload.moduleAlias === singleSqlCfg.moduleAlias
                        && action.payload.moduleName === singleSqlCfg.moduleName
                        && action.payload.tableName === singleSqlCfg.tableName
                        && action.payload.tableChnName === singleSqlCfg.tableChnName) {
                        if (singleSqlCfg.columnAlias.indexOf("|") > -1) {
                            singleSqlCfg.columnAlias = singleSqlCfg.columnAlias + action.payload.columnAlias + "|";
                            singleSqlCfg.columnName = singleSqlCfg.columnName + action.payload.columnName + "|";
                        } else {
                            singleSqlCfg.columnAlias = "|" + singleSqlCfg.columnAlias + "|" + action.payload.columnAlias + "|";
                            singleSqlCfg.columnName = "|" + singleSqlCfg.columnName + "|" + action.payload.columnName + "|";
                        }
                    }
                    return singleSqlCfg;
                });
            } else {
                // 新增加的单表SQL配置返回了主键，直接附加到当前state上
                action.payload.columnAlias = "|" + action.payload.columnAlias + "|";
                action.payload.columnName = "|" + action.payload.columnName + "|";
                listData = [...state.singleSqlConfig.content, action.payload];
            }
            let totalElements = state.singleSqlConfig.totalElements;
            return Object.assign({}, state, { singleSqlConfig: Object.assign({}, state.singleSqlConfig, { content: listData, totalElements: totalElements + 1 }) })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            let totalElements = state.singleSqlConfig.totalElements;
            let number = 0;
            if (totalElements > state.singleSqlConfig.size) {
                number = (totalElements - 1) % state.singleSqlConfig.size === 0 ? state.singleSqlConfig.number - 1 : state.singleSqlConfig.number;
            } else {
                number = state.singleSqlConfig.number;
            }
            return Object.assign({}, state, { singleSqlConfig: Object.assign({}, state.singleSqlConfig, { content: state.singleSqlConfig.content.filter(singleSqlCfg => singleSqlCfg.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.singleSqlConfig.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    item.columnAlias = "|" + action.payload.columnAlias.replace(",", "|");
                    item.columnName = "|" + action.payload.columnName.replace(",", "|");
                }
                return item;
            });
            return Object.assign({}, state, { singleSqlConfig: Object.assign({}, state.singleSqlConfig, { content: listData }) })
        },
        deleteSysDelSys(state, action) {
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
        },
    },

};
