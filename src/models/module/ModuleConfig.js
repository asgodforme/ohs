import { getAllModule, saveModuleConfig, deleteById, updateById } from '../../services/moduleConfig';
import { getAllSysWhenInit } from '../../services/moduleConfig';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'moduleConfig',

    state: {
        allSys: [],
        moduleConfig: {
            content: [],
            number: 0,
            totalElements: 0,
            size: 8,
        },

    },

    subscriptions: {
        setup({ dispatch, history }) {
            // 加载所有系统配置信息，并分发给各个模块
            const data = dispatch({ type: 'getAllSysWhenInit', payload: { sysAlias: '', sysChineseNme: '' } });
            data.then(function (result) {
                dispatch({ type: 'userConfig/saveAllSys', payload: result });
                dispatch({ type: 'evnConfig/saveAllSys', payload: result });
                dispatch({ type: 'tableConfig/saveAllSys', payload: result });
                dispatch({ type: 'enumValueConfig/saveAllSys', payload: result });
                dispatch({ type: 'columnConfig/saveAllSys', payload: result });
                dispatch({ type: 'singleSqlConfig/saveAllSys', payload: result });
                dispatch({ type: 'interfaceConfig/saveAllSys', payload: result });
                dispatch({ type: 'saveAllSys', payload: result });
            });
        },
    },

    effects: {
        *getAllSysWhenInit({ payload }, { call, put }) {
            const allSyses = yield call(getAllSysWhenInit, payload);
            yield put({ type: 'saveAllSys', payload: allSyses });
            return allSyses;
        },
        *getAllSysWhenSysAdd({ payload }, { call, put }) {
            yield put({ type: 'saveSys', payload: payload });
        },
        *getAllModule({ payload }, { call, put }) {
            const moduleCfg = yield call(getAllModule, payload);
            if (moduleCfg.data.status === 500) {
                error(moduleCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: moduleCfg });
                yield put({ type: 'saveQueryParm', payload: payload });
            }
        },
        *saveModuleConfig({ payload }, { call, put }) {
            const result = yield call(saveModuleConfig, payload);
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
        *deleteSys({ payload }, { call, put }) {
            yield put({ type: 'deleteSysDelSys', payload: payload });
        },
        
    },

    reducers: {
        saveQueryParm(state, action) {
            return { ...state, queryParm: action.payload };
        },
        save(state, action) {
            return { ...state, moduleConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.moduleConfig.content, action.payload];
            let totalElements = state.moduleConfig.totalElements;
            return Object.assign({}, state, { moduleConfig: Object.assign({}, state.moduleConfig, { content: listData, totalElements: totalElements + 1 }) })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            let totalElements = state.moduleConfig.totalElements;
            let number = 0;
            if (totalElements > state.moduleConfig.size) {
                number = (totalElements - 1) % state.moduleConfig.size === 0 ? state.moduleConfig.number - 1 : state.moduleConfig.number;
            } else {
                number = state.moduleConfig.number;
            }
            return Object.assign({}, state, { moduleConfig: Object.assign({}, state.moduleConfig, { content: state.moduleConfig.content.filter(moduleCfg => moduleCfg.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.moduleConfig.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { moduleConfig: Object.assign({}, state.moduleConfig, { content: listData }) })
        },
        deleteSysDelSys(state, action) {
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
        },
    },

};
