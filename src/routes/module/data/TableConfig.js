import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../../components/module/common/CommonQueryField'

const queryFields = {
  scroll: {},
  dataName: 'tableConfig',
  updateTitle: '修改表信息',
  addTitle: '新增表信息',
  fieldDescs: ['归属系统码', '归属系统名', 'Schema名', '表名', '表中文名'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'schemaName', 'tableName', 'tableChnName'],
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
  title: 'Schema名',
  dataIndex: 'schemaName',
  key: 'schemaName',
}, {
  title: '表名',
  dataIndex: 'tableName',
  key: 'tableName',
}, {
  title: '表中文名',
  dataIndex: 'tableChnName',
  key: 'tableChnName',
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

const TableConfig = ({ dispatch, tableConfig }) => {
  function getAllTable(table) {
    dispatch({
      type: 'tableConfig/getAllTable',
      payload: table,
    });
  }
  function saveTableConfig(tableConfig) {
    dispatch({
      type: 'tableConfig/saveTableConfig',
      payload: tableConfig,
    });
    // 给字段配置中新增对应的表
    // 给枚举值配置中新增对应的表
    dispatch({
      type: 'columnConfig/getAllTableWhenAdd',
      payload: tableConfig,
    })
  }
  function deleteTableConfig(tableConfig) {
    dispatch({
      type: 'tableConfig/deleteById',
      payload: tableConfig,
    })

    // 给字段配置删除掉对应的表
    dispatch({
      type: 'columnConfig/deleteTableConfig',
      payload: tableConfig,
    })
    // 给枚举值配置删除掉对应的表
    dispatch({
      type: 'enumValueConfig/deleteTableConfig',
      payload: tableConfig,
    })
  }
  function updateTable(tableConfig) {
    dispatch({
      type: 'tableConfig/updateById',
      payload: tableConfig,
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
      <CommonQueryField query={getAllTable} data={tableConfig}
        save={saveTableConfig} delete={deleteTableConfig} update={updateTable}
        queryFields={queryFields} columns={columns} getAllSys={getAllSys}
      />
    </div>
  );
};

// export default Products;
export default connect(({ tableConfig }) => ({
  tableConfig,
}))(TableConfig);