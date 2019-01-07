

export default {
    namespace: 'todos',
    state: [],
    reducers: {
        'delete'(state, { payload: id }) {
            sleep(1000);
            return state.filter(item => item.id !== id);
        },
    }
};


function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
} 