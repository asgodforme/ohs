import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
    scroll: {},
    dataName: 'testsuitConfig',
    updateTitle: '修改测试案例信息',
    addTitle: '新增测试案例信息',
    fieldDescs: ['系统码', '系统名', '模块码', '模块名', '访问路径', '方法', '接口类型', '接口名', '接口别名'],
    fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName', 'urlPath', 'method', 'interfaceType', 'interfaceName', 'interfaceAlias'],
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
    title: '访问路径',
    dataIndex: 'urlPath',
    key: 'urlPath',
}, {
    title: '方法',
    dataIndex: 'method',
    key: 'method',
},{
    title: '接口类型',
    dataIndex: 'interfaceType',
    key: 'interfaceType',
},{
    title: '接口名',
    dataIndex: 'interfaceName',
    key: 'interfaceName',
},{
    title: '接口别名',
    dataIndex: 'interfaceAlias',
    key: 'interfaceAlias',
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

const InterfaceConfig = ({ dispatch, testsuitConfig }) => {
    function getAllInterface(testsuitConfig) {
        dispatch({
            type: 'testsuitConfig/getAllInterface',
            payload: testsuitConfig,
        });
    }
    function saveInterfaceConfig(testsuitConfig) {
        dispatch({
            type: 'testsuitConfig/saveInterfaceConfig',
            payload: testsuitConfig,
        });
    }
    function deleteInterfaceConfig(testsuitConfig) {
        dispatch({
            type: 'testsuitConfig/deleteById',
            payload: testsuitConfig,
        });
    }
    function updateInterface(testsuitConfig) {
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
            <CommonQueryField query={getAllInterface} data={testsuitConfig}
                save={saveInterfaceConfig} delete={deleteInterfaceConfig} update={updateInterface}
                queryFields={queryFields} columns={columns} getAllSys={getAllSys}
            />
        </div>
    );
};

// export default Products;
export default connect(({ testsuitConfig }) => ({
    testsuitConfig,
}))(InterfaceConfig);