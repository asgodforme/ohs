import { getAllEvn, saveEvnConfig, deleteById, updateById } from '../../services/evnConfig';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'evnConfig',

    state: {
        allSys: [],
        evnConfig: [],

    },

    subscriptions: {
        setup({ dispatch, history }) {
            
        },
    },

    effects: {
        *getAllEvn({ payload }, { call, put }) {
            console.log('111111');
            const evnCfg = yield call(getAllEvn, payload);
            if (evnCfg.data.status === 500) {
                error(evnCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: evnCfg });
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
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, evnConfig: action.payload.data };
        },
        saveOne(state, action) {
            let listData = [...state.evnConfig, action.payload];
            return Object.assign({}, state, { evnConfig: listData })
        },
        saveAllSys(state, action) {
            return { ...state, allSys: action.payload.data };
        },
        delete(state, action) {
            return Object.assign({}, state, { evnConfig: state.evnConfig.filter(moduleCfg => moduleCfg.id !== action.payload.id) })
        },
        update(state, action) {
            let listData = [...state.evnConfig];
            listData = (listData || []).map((item, index) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return Object.assign({}, state, { evnConfig: listData })
        }
    },

};
