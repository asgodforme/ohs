import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
  dataName: 'evnConfig',
  updateTitle: '修改环境',
  addTitle: '新增环境',
  fieldDescs: ['归属系统码', '归属系统名', '环境别名', '环境名', '环境类型', 'IP地址', '端口号', '接口名', 'DB用户名', 'DB密码'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'evnAlias', 'evnName', 'evnTyp', 'evnIp', 'evnPort', 'interfaceNme', 'dbNme', 'dbPwd'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '归属系统码',
  dataIndex: 'sysAlias',
  key: 'sysAlias',
}, {
  title: '归属系统名',
  dataIndex: 'sysChineseNme',
  key: 'sysChineseNme',
}, {
  title: '环境别名',
  dataIndex: 'evnAlias',
  key: 'evnAlias',
}, {
  title: '环境名',
  dataIndex: 'evnName',
  key: 'evnName',
}, {
  title: '环境类型',
  dataIndex: 'evnTyp',
  key: 'evnTyp',
}, {
  title: 'IP地址',
  dataIndex: 'evnIp',
  key: 'evnIp',
}, {
  title: '端口号',
  dataIndex: 'evnPort',
  key: 'evnPort',
}, {
  title: '接口名',
  dataIndex: 'interfaceNme',
  key: 'interfaceNme',
}, {
  title: 'DB用户名',
  dataIndex: 'dbNme',
  key: 'dbNme',
}, {
  title: 'DB密码',
  dataIndex: 'dbPwd',
  key: 'dbPwd',
}, {
  title: '创建者',
  dataIndex: 'createUser',
  key: 'createUser',
}, {
  title: '创建时间',
  dataIndex: 'createDate',
  key: 'createDate',
}, {
  title: '修改者',
  dataIndex: 'updateUser',
  key: 'updateUser',
}, {
  title: '修改时间',
  dataIndex: 'updateDate',
  key: 'updateDate',
}];

const EvnConfig = ({ dispatch, evnConfig }) => {
  function getAllEnv(evn) {
    console.log("12222");
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
  function deleteEnvConfig(id) {
    dispatch({
      type: 'evnConfig/deleteById',
      payload: id,
    })
  }
  function updateEnv(evnConfig) {
    dispatch({
      type: 'evnConfig/updateById',
      payload: evnConfig,
    })
  }

  return (
    <div>
      <CommonQueryField query={getAllEnv} data={evnConfig}
        save={saveEnvConfig} delete={deleteEnvConfig} update={updateEnv}
        queryFields={queryFields} columns={columns}
      />
    </div>
  );
};

// export default Products;
export default connect(({ evnConfig }) => ({
  evnConfig,
}))(EvnConfig);