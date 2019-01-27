import { getAllEvn, saveEvnConfig, deleteById, updateById } from '../../services/evnConfig';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'evnConfig',

    state: {
        allSys: [],
        evnConfig: {
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
        *getAllEvn({ payload }, { call, put }) {
            const evnCfg = yield call(getAllEvn, payload);
            if (evnCfg.data.status === 500) {
                error(evnCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: evnCfg });
                yield put({ type: 'saveQueryParm', payload: payload });
            }
        },
        *saveEvnConfig({ payload }, { call, put }) {
            const result = yield call(saveEvnConfig, payload);
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
        *getAllSysWhenSysAdd({ payload }, { call, put }) {
            yield put({ type: 'saveSys', payload: payload });
        },
    },

    reducers: {
        saveQueryParm(state, action) {
            return { ...state, queryParm: action.payload };
        },
        save(state, action) {
            return { ...state, evnConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.evnConfig.content, action.payload];
            let totalElements = state.evnConfig.totalElements;
            return Object.assign({}, state, { evnConfig: Object.assign({}, state.evnConfig, { content: listData, totalElements: totalElements + 1 }) })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        saveSys(state, action) {
            let listData = [...state.allSys, { ...action.payload, id: state.allSys.length + 1 }];
            return Object.assign({}, state, { allSys: listData });
        },
        delete(state, action) {
            let totalElements = state.evnConfig.totalElements;
            let number = 0;
            if (totalElements > state.evnConfig.size) {
                number = (totalElements - 1) % state.evnConfig.size === 0 ? state.evnConfig.number - 1 : state.evnConfig.number;
            } else {
                number = state.evnConfig.number;
            }
            return Object.assign({}, state, { evnConfig: Object.assign({}, state.evnConfig, { content: state.evnConfig.content.filter(evnCfg => evnCfg.id !== action.payload.id), totalElements: totalElements - 1, number: number }) })
        },
        update(state, action) {
            let listData = [...state.evnConfig.content];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { evnConfig: Object.assign({}, state.evnConfig, { content: listData }) })
        },
        deleteSysDelSys(state, action) {
            console.log(state)
            console.log(action)
            return Object.assign({}, state, { allSys: state.allSys.filter(sysCfg => sysCfg.sysAlias !== action.payload.sysAlias && sysCfg.sysChineseNme !== action.payload.sysChineseNme) })
        },
    },

};
