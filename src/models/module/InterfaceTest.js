import { getAllInterface, saveInterfaceTest, deleteById, updateById, saveInterfaceSingleRecords } from '../../services/interfaceConfig';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'interfaceTest',

    state: {
        allSys: [],
        interfaceTest: {
            content: [],
            number: 0,
            totalElements: 0,
            size: 5,
        },

    },

    subscriptions: {
        setup({ dispatch, history }) {
          
        },
    },

    effects: {
        // *getAllSysWhenInit({ payload }, { call, put }) {
        //     const allSyses = yield call(getAllSysWhenInit, payload);
        //     yield put({ type: 'saveAllSys', payload: allSyses });
        //     return allSyses;
        // },
        *getAllInterface({ payload }, { call, put }) {
            payload.isTest = 'Y';
            const interfaceCfg = yield call(getAllInterface, payload);
            if (interfaceCfg.data.status === 500) {
                error(interfaceCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: interfaceCfg });
                yield put({ type: 'saveQueryParm', payload: payload });
            }
        },
        // *getAllTableWhenAdd({ payload }, { call, put }) {
        //     yield put({ type: 'saveTable', payload: payload });
        // },
        *saveInterfaceTest({ payload }, { call, put }) {
            const result = yield call(saveInterfaceTest, payload);
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
        // *getAllSysWhenSysAdd({ payload }, { call, put }) {
        //     yield put({ type: 'saveSys', payload: payload });
        // },
        *deleteSys({ payload }, { call, put }) {
            yield put({ type: 'deleteSysDelSys', payload: payload });
        },
        *saveParameterValue({ payload }, { call, put }) {
            const result = yield call(saveInterfaceSingleRecords, payload);
            if (result.data.status === 500) {
                error(result.data.statusText);
            } else {
                success("保存成功！");
                yield put({ type: 'saveParameterValueLocal', payload: payload });
            }
        }
    },

    reducers: {
        saveParameterValueLocal(state, action) {
            console.log(state);
            return  { ...state, parameterMaps: action.payload };
        },
        saveQueryParm(state, action) {
            return { ...state, queryParm: action.payload };
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
            return { ...state, interfaceTest: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.interfaceTest.content, action.payload];
            let totalElements = state.interfaceTest.totalElements;
            return Object.assign({}, state, { interfaceTest: Object.assign({}, state.interfaceTest, { content: listData, totalElements: totalElements + 1 }) })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            let totalElements = state.interfaceTest.totalElements;
            let number = 0;
            if (totalElements > state.interfaceTest.size) {
                number = (totalElements - 1) % state.interfaceTest.size === 0 ? state.interfaceTest.number - 1 : state.interfaceTest.number;
            } else {
                number = state.interfaceTest.number;
            }
            return Object.assign({}, state, { interfaceTest: Object.assign({}, state.interfaceTest, { content: state.interfaceTest.content.filter(interfaceCfg => interfaceCfg.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.interfaceTest.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { interfaceTest: Object.assign({}, state.interfaceTest, { content: listData }) })
        },
        deleteSysDelSys(state, action) {
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
        },
    },

};
