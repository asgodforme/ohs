import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
  scroll:  { x: 2500, y: 500 },
  dataName: 'evnConfig',
  updateTitle: '修改环境',
  addTitle: '新增环境',
  fieldDescs: ['归属系统码', '归属系统名', '环境类型', '环境别名', '环境名', 'IP地址', '端口号', 'DB用户名', 'DB密码', 'DB类型'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'evnTyp', 'evnAlias', 'evnName', 'evnIp', 'evnPort', 'dbNme', 'dbPwd', 'dbType'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  width: 50,
  key: 'id',
}, {
  title: '归属系统码',
  dataIndex: 'sysAlias',
  width: 100,
  key: 'sysAlias',
}, {
  title: '归属系统名',
  dataIndex: 'sysChineseNme',
  width: 150,
  key: 'sysChineseNme',
}, {
  title: '环境类型',
  dataIndex: 'evnTyp',
  width: 100,
  key: 'evnTyp',
}, {
  title: '环境别名',
  dataIndex: 'evnAlias',
  width: 200,
  key: 'evnAlias',
}, {
  title: '环境名',
  dataIndex: 'evnName',
  key: 'evnName',
}, {
  title: 'IP地址',
  dataIndex: 'evnIp',
  width: 200,
  key: 'evnIp',
}, {
  title: '端口号',
  dataIndex: 'evnPort',
  width: 100,
  key: 'evnPort',
}, {
  title: 'DB用户名',
  dataIndex: 'dbNme',
  width: 100,
  key: 'dbNme',
}, {
  title: 'DB密码',
  dataIndex: 'dbPwd',
  width: 100,
  key: 'dbPwd',
}, {
  title: 'DB类型',
  dataIndex: 'dbType',
  width: 100,
  key: 'dbType',
}, {
  title: '创建者',
  dataIndex: 'createUser',
  width: 150,
  key: 'createUser',
}, {
  title: '创建时间',
  dataIndex: 'createDate',
  width: 200,
  key: 'createDate',
}, {
  title: '修改者',
  dataIndex: 'updateUser',
  width: 150,
  key: 'updateUser',
}, {
  title: '修改时间',
  dataIndex: 'updateDate',
  width: 200,
  key: 'updateDate',
}];

const EvnConfig = ({ dispatch, evnConfig }) => {
  function getAllEnv(evn) {
    dispatch({
      type: 'evnConfig/getAllEvn',
      payload: evn,
    });
  }
  function saveEnvConfig(evnConfig) {
    dispatch({
      type: 'evnConfig/saveEvnConfig',
      payload: evnConfig,
    });
  }
  function deleteEnvConfig(evnConfig) {
    dispatch({
      type: 'evnConfig/deleteById',
      payload: evnConfig,
    })
  }
  function updateEnv(evnConfig) {
    dispatch({
      type: 'evnConfig/updateById',
      payload: evnConfig,
    })
  }
  function getAllSys() {
    dispatch({
      type: 'moduleConfig/getAllSysWhenInit',
      payload: { sysAlias: '', sysChineseNme: '' }
    });
  }
  return (
    <div>
      <CommonQueryField query={getAllEnv} data={evnConfig}
        save={saveEnvConfig} delete={deleteEnvConfig} update={updateEnv}
        queryFields={queryFields} columns={columns} getAllSys={getAllSys}
      />
    </div>
  );
};

// export default Products;
export default connect(({ evnConfig }) => ({
  evnConfig,
}))(EvnConfig);