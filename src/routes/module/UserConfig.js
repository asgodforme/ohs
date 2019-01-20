import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
  scroll: {},
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

const UserConfig = ({ dispatch, userConfig }) => {
  function getAllUser(user) {
    dispatch({
      type: 'userConfig/getAllUser',
      payload: user,
    });
  }
  function saveUserConfig(userConfig) {
    dispatch({
      type: 'userConfig/saveUserConfig',
      payload: userConfig,
    });
  }
  function deleteUserConfig(id) {
    dispatch({
      type: 'userConfig/deleteById',
      payload: id,
    })
  }
  function updateUser(userConfig) {
    dispatch({
      type: 'userConfig/updateById',
      payload: userConfig,
    })
  }

  return (
    <div>
      <CommonQueryField query={getAllUser} data={userConfig}
        save={saveUserConfig} delete={deleteUserConfig} update={updateUser}
        queryFields={queryFields} columns={columns}
      />
    </div>
  );
};

// export default Products;
export default connect(({ userConfig }) => ({
  userConfig,
}))(UserConfig);