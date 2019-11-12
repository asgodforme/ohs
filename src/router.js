import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
// import Products from './routes/Products';
// import Todos from './routes/Todos';
// import MainLayout from './components/MainLayout';
import mainMenu from './routes/menu/MainMenus';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={MainLayout} />
        <Route path="/products" exact component={Products} />
        <Route path="/todos" exact component={Todos} /> */}
        <Route path="/" exact component={mainMenu} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
