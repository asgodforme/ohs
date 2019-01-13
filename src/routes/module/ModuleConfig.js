import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
  dataName: 'moduleConfig',
  updateTitle: '修改模块',
  addTitle: '新增模块',
  fieldDescs: ['系统码', '系统名', '模块码', '模块名'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '系统名',
  dataIndex: 'sysChineseNme',
  key: 'sysChineseNme',
}, {
  title: '系统码',
  dataIndex: 'sysAlias',
  key: 'sysAlias',
}, {
  title: '模块名',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '模块码',
  dataIndex: 'moduleAlias',
  key: 'moduleAlias',
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

const ModuleConfig = ({ dispatch, moduleConfig }) => {
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
}))(ModuleConfig);