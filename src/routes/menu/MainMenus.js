import React from 'react';
import { connect } from 'dva';
import { Menus } from '../../components/menu/Menus';

const MainMenus = ({ dispatch, menu }) => {

  function saveUserConfig(userConfig) {
    dispatch({
      type: 'userConfig/saveUserConfig',
      payload: userConfig,
    });
    dispatch({
      type: 'menu/saveLoginUser',
      payload: userConfig
    });
    dispatch({
      type: 'moduleConfig/getAllSysWhenInit',
      payload: { sysAlias: '', sysChineseNme: '' }
    });
  }

  return (
    <Menus menus={menu} saveUserConfig={saveUserConfig} />
  );
};


export default connect(({ menu }) => ({
  menu,
}))(MainMenus);