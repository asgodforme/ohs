import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
    scroll: {},
    dataName: 'testsuitConfig',
    updateTitle: '修改测试案例信息',
    addTitle: '新增测试案例信息',
    fieldDescs: ['系统码', '系统名', '模块码', '模块名', '案例名称', '版本号', 
                '前置操作', '前置操作请求模板', '前置响应解析正则',
                '后置操作', '后置操作请求模板', '后置响应解析正则'],    
    fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName',  'testsuitName', 'versionNo', 
                'preOprUrl', 'preReqOprData', 'preRspDataRegx', 
                'afterOperUrl', 'afterReqOprData', 'afterRspDataRegx'],
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
    title: '模块码',
    dataIndex: 'moduleAlias',
    key: 'moduleAlias',
}, {
    title: '模块名',
    dataIndex: 'moduleName',
    key: 'moduleName',
}, {
    title: '案例名称',
    dataIndex: 'testsuitName',
    key: 'testsuitName',
}, {
    title: '版本号',
    dataIndex: 'versionNo',
    key: 'versionNo',
},{
    title: '前置操作',
    dataIndex: 'preOprUrl',
    key: 'preOprUrl',
},{
    title: '前置操作请求模板',
    dataIndex: 'preReqOprData',
    key: 'preReqOprData',
},{
    title: '前置响应解析正则',
    dataIndex: 'preRspDataRegx',
    key: 'preRspDataRegx',
},{
    title: '后置操作',
    dataIndex: 'afterOprUrl',
    key: 'afterOprUrl',
},{
    title: '后置操作请求模板',
    dataIndex: 'afterReqOprData',
    key: 'afterReqOprData',
},{
    title: '后置响应解析正则',
    dataIndex: 'afterRspDataRegx',
    key: 'afterRspDataRegx',
},  {
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

const TestsuitConfig = ({ dispatch, testsuitConfig }) => {
    function getAllTestsuit(testsuitConfig) {
        dispatch({
            type: 'testsuitConfig/getAllTestsuit',
            payload: testsuitConfig,
        });
    }
    function saveTestsuitConfig(testsuitConfig) {
        dispatch({
            type: 'testsuitConfig/saveTestsuitConfig',
            payload: testsuitConfig,
        });
    }
    function deleteTestsuitConfig(testsuitConfig) {
        dispatch({
            type: 'testsuitConfig/deleteById',
            payload: testsuitConfig,
        });
    }
    function updateTestsuit(testsuitConfig) {
        dispatch({
            type: 'testsuitConfig/updateById',
            payload: testsuitConfig,
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
            <CommonQueryField query={getAllTestsuit} data={testsuitConfig}
                save={saveTestsuitConfig} delete={deleteTestsuitConfig} update={updateTestsuit}
                queryFields={queryFields} columns={columns} getAllSys={getAllSys}
            />
        </div>
    );
};

// export default Products;
export default connect(({ testsuitConfig }) => ({
    testsuitConfig,
}))(TestsuitConfig);