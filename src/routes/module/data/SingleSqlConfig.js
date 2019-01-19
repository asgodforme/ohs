import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../../components/module/common/CommonQueryField'

const queryFields = {
  dataName: 'singleSqlConfig',
  updateTitle: '修改单表SQL',
  addTitle: '新增单表SQL',
  fieldDescs: ['系统码', '系统名','模块别名', '模块名', '表名', '表中文名', '备注', '单表SQL'],
  fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName',  'tableName', 'tableChnName', 'remark', 'singleTableSql'],
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '系统码',
  dataIndex: 'sysAlias',
  key: 'sysAlias',
},{
  title: '系统名',
  dataIndex: 'sysChineseNme',
  key: 'sysChineseNme',
}, {
  title: '模块名',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '模块别名',
  dataIndex: 'moduleAlias',
  key: 'moduleAlias',
}, {
  title: '表名',
  dataIndex: 'tableName',
  key: 'tableName',
}, {
  title: '表中文名',
  dataIndex: 'tableChnName',
  key: 'tableChnName',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
}, {
  title: '单表SQL',
  dataIndex: 'singleTableSql',
  key: 'singleTableSql',
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
  function deleteSingleSqlConfig(id) {
    dispatch({
      type: 'singleSqlConfig/deleteById',
      payload: id,
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