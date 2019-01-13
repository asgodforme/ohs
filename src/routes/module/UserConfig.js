import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
  dataName: 'userConfig',
  updateTitle: '修改用户',
  addTitle: '新增用户',
  fieldDescs: ['姓名', '登录账号', '密码', '角色'],
  fieldNames: ['name', 'loginAccount', 'password', 'role'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '登录账号',
  dataIndex: 'loginAccount',
  key: 'loginAccount',
}, {
  title: '密码',
  dataIndex: 'password',
  key: 'password',
}, {
  title: '角色',
  dataIndex: 'role',
  key: 'role',
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

const UserConfig = ({ dispatch, moduleConfig }) => {
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
}))(UserConfig);