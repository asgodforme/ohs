import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../../components/module/common/CommonQueryField'

const queryFields = {
  dataName: 'columnConfig',
  updateTitle: '修改字段信息',
  addTitle: '新增字段信息',
  fieldDescs: ['Schema名', '归属表名', '字段名', '字段别名'],
  fieldNames: ['schema', 'columnName', 'columnName', 'columnAlias'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Schema名',
  dataIndex: 'schema',
  key: 'schema',
}, {
  title: '归属表名',
  dataIndex: 'columnName',
  key: 'columnName',
}, {
  title: '字段名',
  dataIndex: 'columnName',
  key: 'columnName',
}, {
  title: '字段别名',
  dataIndex: 'columnAlias',
  key: 'columnAlias',
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

const ColumnConfig = ({ dispatch, columnConfig }) => {
  function getAllColumn(column) {
    dispatch({
      type: 'columnConfig/getAllColumn',
      payload: column,
    });
  }
  function saveColumnConfig(columnConfig) {
    dispatch({
      type: 'columnConfig/saveColumnConfig',
      payload: columnConfig,
    });
  }
  function deleteColumnConfig(id) {
    dispatch({
      type: 'columnConfig/deleteById',
      payload: id,
    })
  }
  function updateColumn(columnConfig) {
    dispatch({
      type: 'columnConfig/updateById',
      payload: columnConfig,
    })
  }

  return (
    <div>
      <CommonQueryField query={getAllColumn} data={columnConfig}
        save={saveColumnConfig} delete={deleteColumnConfig} update={updateColumn}
        queryFields={queryFields} columns={columns}
      />
    </div>
  );
};

// export default Products;
export default connect(({ columnConfig }) => ({
    columnConfig,
}))(ColumnConfig);