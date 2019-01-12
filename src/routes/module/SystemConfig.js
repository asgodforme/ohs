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
  }
  function deleteSysConfig(id) {
    dispatch({
      type: 'systemConfig/deleteById',
      payload: id,
    })
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