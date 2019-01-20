import React from 'react';
import { connect } from 'dva';
import SysCfgQueryField from '../../components/module/SysCfgQueryField'

const SystemConfig = ({ dispatch, systemConfig }) => {
  function getAllSys(sys) {
    dispatch({
      type: 'systemConfig/getAllSys',
      payload: sys,
    });
  }
  function saveSysConfig(sysConfig) {
    dispatch({
      type: 'systemConfig/saveSysConfig',
      payload: sysConfig,
    });
    // 给模块配置新增添加的系统配置信息
    dispatch({
      type: 'moduleConfig/getAllSysWhenSysAdd',
      payload: sysConfig,
    });
    // 给环境配置新增添加的系统配置信息
    dispatch({
      type: 'evnConfig/getAllSysWhenSysAdd',
      payload: sysConfig,
    });
    // 给表配置新增添加的系统配置信息
    dispatch({
      type: 'tableConfig/getAllSysWhenSysAdd',
      payload: sysConfig,
    });
    // 给字段配置新增添加的系统配置信息
    dispatch({
      type: 'columnConfig/getAllSysWhenSysAdd',
      payload: sysConfig,
    });
    // 给枚举值配置新增添加的系统配置信息
    dispatch({
      type: 'enumValueConfig/getAllSysWhenSysAdd',
      payload: sysConfig,
    });
    // 给单表SQL配置新增添加的系统配置信息
    dispatch({
      type: 'singleSqlConfig/getAllSysWhenSysAdd',
      payload: sysConfig,
    });
  }
  function deleteSysConfig(sysConfig) {
    dispatch({
      type: 'systemConfig/deleteById',
      payload: sysConfig,
    });
    // 删除掉模块配置的系统信息
    dispatch({
      type: 'moduleConfig/deleteSys',
      payload: sysConfig,
    });
    // 删除掉环境配置的系统信息
    dispatch({
      type: 'evnConfig/deleteSys',
      payload: sysConfig,
    });
    // 删除掉表配置的系统信息
    dispatch({
      type: 'tableConfig/deleteSys',
      payload: sysConfig,
    });
    // 删除掉字段配置的系统信息
    dispatch({
      type: 'columnConfig/deleteSys',
      payload: sysConfig,
    });
    // 删除掉枚举值配置的系统信息
    dispatch({
      type: 'enumValueConfig/deleteSys',
      payload: sysConfig,
    });
    // 删除掉单表SQL配置的系统信息
    dispatch({
      type: 'singleSqlConfig/deleteSys',
      payload: sysConfig,
    });
  }
  function updateSysConfig(sysConfig) {
    dispatch({
      type: 'systemConfig/updateById',
      payload: sysConfig,
    })
  }

  return (
    <div>
      <SysCfgQueryField query={getAllSys} data={systemConfig} save={saveSysConfig} delete={deleteSysConfig} update={updateSysConfig} />
    </div>
  );
};

// export default Products;
export default connect(({ systemConfig }) => ({
  systemConfig,
}))(SystemConfig);