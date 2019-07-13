import { getModuleBySysAlias, querySubmit } from '../../services/dataQuery';
import { error, success } from '../../components/module/SysCfgQueryFieldAlert'


export default {

    namespace: 'dataQuery',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line

        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
        *getModuleBySysAlias({ payload }, { call, put }) {
            const result = yield call(getModuleBySysAlias, payload);
            if (result.data.status === 500) {
                error(result.data.statusText);
            } else {
                yield put({ type: 'saveModuleBySysAlias', payload: result.data });
            }
        },
        *querySubmit({payload}, {call, put}) {
            console.log(payload);
            const result = yield call(querySubmit, payload);
            console.log(result);
        }
    },

    reducers: {
        saveModuleBySysAlias(state, action) {
            return { ...state, modules: action.payload };
        },
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
