import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
  dataName: 'envConfig',
  updateTitle: '修改环境',
  addTitle: '新增环境',
  fieldDescs: ['归属系统码', '归属系统名', '环境别名', '环境名', '环境类型', 'IP地址', '端口号', '接口名', 'DB用户名', 'DB密码'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'envAlias', 'envName', 'envTyp', 'envIp', 'envPort', 'interfaceNme', 'dbNme', 'dbPwd'],
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
  dataIndex: 'envAlias',
  key: 'envAlias',
}, {
  title: '环境名',
  dataIndex: 'envName',
  key: 'envName',
}, {
  title: '环境类型',
  dataIndex: 'envTyp',
  key: 'envTyp',
}, {
  title: 'IP地址',
  dataIndex: 'envIp',
  key: 'envIp',
}, {
  title: '端口号',
  dataIndex: 'envPort',
  key: 'envPort',
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

const EnvConfig = ({ dispatch, moduleConfig }) => {
  function getAllModule(modle) {
    dispatch({
      type: 'moduleConfig/getAllModule',
      payload: modle,
    });
  }
  function saveModuleConfig(moduleConfig) {
    dispatch({
      type: 'moduleConfig/saveModuleConfig',
      payload: moduleConfig,
    });
  }
  function deleteModuleConfig(id) {
    dispatch({
      type: 'moduleConfig/deleteById',
      payload: id,
    })
  }
  function updateModule(moduleConfig) {
    dispatch({
      type: 'moduleConfig/updateById',
      payload: moduleConfig,
    })
  }

  return (
    <div>
      <CommonQueryField query={getAllModule} data={moduleConfig}
        save={saveModuleConfig} delete={deleteModuleConfig} update={updateModule}
        queryFields={queryFields} columns={columns}
      />
    </div>
  );
};

// export default Products;
export default connect(({ moduleConfig }) => ({
  moduleConfig,
}))(EnvConfig);