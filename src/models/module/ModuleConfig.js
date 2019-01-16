import { getAllModule, saveModuleConfig, deleteById, updateById } from '../../services/moduleConfig';
import { getAllSysWhenInit } from '../../services/moduleConfig';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'moduleConfig',

    state: {
        allSys: [],
        moduleConfig: [],

    },

    subscriptions: {
        setup({ dispatch, history }) {
            const data = dispatch({ type: 'getAllSysWhenInit', payload: { sysAlias: '', sysChineseNme: '' } });
            data.then(function (result) {
                console.log(result);
                dispatch({ type: 'userConfig/saveAllSys', payload: result });
                dispatch({ type: 'evnConfig/saveAllSys', payload: result });
                dispatch({ type: 'tableConfig/saveAllSys', payload: result });
                dispatch({ type: 'enumValueConfig/saveAllSys', payload: result });
                dispatch({ type: 'columnConfig/saveAllSys', payload: result });
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
        *deleteSys({ payload }, { call, put }) {
            yield put({ type: 'deleteSysDelSys', payload: payload });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, moduleConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.moduleConfig, action.payload];
            return Object.assign({}, state, { moduleConfig: listData })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            return Object.assign({}, state, { moduleConfig: state.moduleConfig.filter(moduleCfg => moduleCfg.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.moduleConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { moduleConfig: listData })
        },
        deleteSysDelSys(state, action) {
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.id !== action.payload) })
        },
    },

};
