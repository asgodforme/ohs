import React from 'react';
import { connect } from 'dva';
import { Menus } from '../../components/menu/Menus';

const MainMenus = ({ menu }) => {
  return (
    <Menus menus={menu} />
  );
};


export default connect(({ menu }) => ({
  menu,
}))(MainMenus);