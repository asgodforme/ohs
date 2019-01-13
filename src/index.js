import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
  initialState: {
    products1: [
      { key: 1, name: 'dva', id: 1 },
      { key: 2, name: 'antd', id: 2 },
    ],
    todos: [
      { key: 1, value: 'aaaaaaa', id: 1 },
      { key: 2, value: 'bbbbbbb', id: 2 },
    ]
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);
app.model(require('./models/todos').default);
app.model(require('./models/menu/menu').default)
app.model(require('./models/module/SystemConfig').default)
app.model(require('./models/module/ModuleConfig').default)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
