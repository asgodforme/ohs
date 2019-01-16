import { getAllEnumValue, saveEnumValueConfig, deleteById, updateById } from '../../../services/data/enumValueConfig';
import { error, success } from '../../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'enumValueConfig',

    state: {
        allSys: [],
        enumValueConfig: [],

    },

    subscriptions: {
        setup({ dispatch, history }) {
            
        },
    },

    effects: {
        *getAllEnumValue({ payload }, { call, put }) {
            const enumValueCfg = yield call(getAllEnumValue, payload);
            if (enumValueCfg.data.status === 500) {
                error(enumValueCfg.data.statusText);
            } else {
                yield put({ type: 'save', payload: enumValueCfg });
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
        *getAllSysWhenSysAdd({ payload }, { call, put }) {
            yield put({ type: 'saveSys', payload: payload });
        },
    },

    reducers: {
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
        }
    },

};
