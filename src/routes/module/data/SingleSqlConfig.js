import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../../components/module/common/CommonQueryField'

const queryFields = {
  scroll: { x: 3000, y: 500 },
  dataName: 'singleSqlConfig',
  updateTitle: '修改单表SQL',
  addTitle: '新增单表SQL',
  fieldDescs: ['系统码', '系统名', '模块别名', '模块名', '表名', '表中文名', '查询key', '查询key中文', '备注', '单表SQL'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName', 'tableName', 'tableChnName', 'columnName', 'columnAlias', 'remark', 'singleTableSql'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  fixed: 'left',
  width: 50,
  key: 'id',
}, {
  title: '系统码',
  dataIndex: 'sysAlias',
  width: 100,
  key: 'sysAlias',
}, {
  title: '系统名',
  dataIndex: 'sysChineseNme',
  width: 150,
  key: 'sysChineseNme',
}, {
  title: '模块名',
  dataIndex: 'moduleName',
  width: 100,
  key: 'moduleName',
}, {
  title: '模块别名',
  dataIndex: 'moduleAlias',
  width: 100,
  key: 'moduleAlias',
}, {
  title: '表名',
  dataIndex: 'tableName',
  width: 200,
  key: 'tableName',
}, {
  title: '表中文名',
  dataIndex: 'tableChnName',
  width: 200,
  key: 'tableChnName',
}, {
  title: '查询key',
  width: 250,
  dataIndex: 'columnName',
  key: 'columnName',
}, {
  title: '查询key中文',
  width: 250,
  dataIndex: 'columnAlias',
  key: 'columnAlias',
}, {
  title: '备注',
  width: 300,
  dataIndex: 'remark',
  key: 'remark',
}, {
  title: '单表SQL',
  dataIndex: 'singleTableSql',
  key: 'singleTableSql',
}, {
  title: '创建者',
  width: 100,
  dataIndex: 'createUser',
  key: 'createUser',
}, {
  title: '创建时间',
  width: 200,
  dataIndex: 'createDate',
  key: 'createDate',
}, {
  title: '修改者',
  width: 100,
  dataIndex: 'updateUser',
  key: 'updateUser',
}, {
  title: '修改时间',
  width: 200,
  dataIndex: 'updateDate',
  key: 'updateDate',
}];

const SingleSqlConfig = ({ dispatch, singleSqlConfig }) => {
  function getAllSingleSql(singleSql) {
    dispatch({
      type: 'singleSqlConfig/getAllSingleSql',
      payload: singleSql,
    });
  }
  function saveSingleSqlConfig(singleSqlConfig) {
    dispatch({
      type: 'singleSqlConfig/saveSingleSqlConfig',
      payload: singleSqlConfig,
    });
  }
  function deleteSingleSqlConfig(singleSqlConfig) {
    dispatch({
      type: 'singleSqlConfig/deleteById',
      payload: singleSqlConfig,
    })
  }
  function updateSingleSql(singleSqlConfig) {
    dispatch({
      type: 'singleSqlConfig/updateById',
      payload: singleSqlConfig,
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
      <CommonQueryField query={getAllSingleSql} data={singleSqlConfig}
        save={saveSingleSqlConfig} delete={deleteSingleSqlConfig} update={updateSingleSql}
        queryFields={queryFields} columns={columns} getAllSys={getAllSys}
      />
    </div>
  );
};

// export default Products;
export default connect(({ singleSqlConfig }) => ({
  singleSqlConfig,
}))(SingleSqlConfig);