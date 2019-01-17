import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../../components/module/common/CommonQueryField'

const queryFields = {
  dataName: 'enumValueConfig',
  updateTitle: '修改枚举值信息',
  addTitle: '新增枚举值信息',
  fieldDescs: ['系统码', '系统名', 'Schema名', '归属表名', '字段名', '字段别名', '枚举值', '中文注释'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'schemaName', 'tableName', 'columnName', 'columnAliascd ', 'enumValue', 'enumChineseValue'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '系统码',
  dataIndex: 'sysAlias',
  key: 'sysAlias',
}, {
  title: '系统名',
  dataIndex: 'sysChineseNme',
  key: 'sysChineseNme',
}, {
  title: 'Schema名',
  dataIndex: 'schemaName',
  key: 'schemaName',
}, {
  title: '归属表名',
  dataIndex: 'tableName',
  key: 'tableName',
}, {
  title: '字段名',
  dataIndex: 'columnName',
  key: 'columnName',
}, {
  title: '字段别名',
  dataIndex: 'columnAlias',
  key: 'columnAlias',
}, {
  title: '枚举值',
  dataIndex: 'enumValue',
  key: 'enumValue',
}, {
  title: '中文注释',
  dataIndex: 'enumChineseValue',
  key: 'enumChineseValue',
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

const EnumValueConfig = ({ dispatch, enumValueConfig }) => {
  function getAllEnumValue(enumValue) {
    dispatch({
      type: 'enumValueConfig/getAllEnumValue',
      payload: enumValue,
    });
  }
  function saveEnumValueConfig(enumValueConfig) {
    dispatch({
      type: 'enumValueConfig/saveEnumValueConfig',
      payload: enumValueConfig,
    });
  }
  function deleteEnumValueConfig(id) {
    dispatch({
      type: 'enumValueConfig/deleteById',
      payload: id,
    })
  }
  function updateEnumValue(enumValueConfig) {
    dispatch({
      type: 'enumValueConfig/updateById',
      payload: enumValueConfig,
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
      <CommonQueryField query={getAllEnumValue} data={enumValueConfig}
        save={saveEnumValueConfig} delete={deleteEnumValueConfig} update={updateEnumValue}
        queryFields={queryFields} columns={columns} getAllSys={getAllSys}
      />
    </div>
  );
};

// export default Products;
export default connect(({ enumValueConfig }) => ({
  enumValueConfig,
}))(EnumValueConfig);