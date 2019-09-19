import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
    scroll: {},
    dataName: 'interfaceTest',
    isHideAddBtn: "Y",
    isExeButton: "Y",
    updateTitle: '修改接口信息',
    addTitle: '新增接口信息',
    fieldDescs: ['系统码', '系统名', '模块码', '模块名', '访问路径', '方法', '接口类型', '接口名', '接口别名', '请求报文', '响应报文'],
    fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName', 'urlPath', 'method', 'interfaceType', 'interfaceName', 'interfaceAlias', 'request', 'response'],
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
    title: '请求报文',
    dataIndex: 'request',
    key: 'request',
},{
    title: '响应报文',
    dataIndex: 'response',
    key: 'response',
}];

const InterfaceTest = ({ dispatch, interfaceTest }) => {
    function getAllInterface(interfaceTest) {
        dispatch({
            type: 'interfaceTest/getAllInterface',
            payload: interfaceTest,
        });
    }
    function saveInterfaceTest(interfaceTest) {
        dispatch({
            type: 'interfaceTest/saveInterfaceTest',
            payload: interfaceTest,
        });
    }
    function deleteInterfaceTest(interfaceTest) {
        dispatch({
            type: 'interfaceTest/deleteById',
            payload: interfaceTest,
        });
    }
    function updateInterface(interfaceTest) {
        dispatch({
            type: 'interfaceTest/updateById',
            payload: interfaceTest,
        })
    }
    function getAllSys() {
        dispatch({
            type: 'moduleConfig/getAllSysWhenInit',
            payload: { sysAlias: '', sysChineseNme: '' }
        });
    }
    function saveParameterValue(interfaceTest) {
        dispatch({
            type: 'interfaceTest/saveParameterValue',
            payload: interfaceTest,
        })
    }

    return (
        <div>
            <CommonQueryField query={getAllInterface} data={interfaceTest}
                save={saveInterfaceTest} delete={deleteInterfaceTest} update={updateInterface}
                queryFields={queryFields} columns={columns} getAllSys={getAllSys}
                saveParameterValue={saveParameterValue}
            />
        </div>
    );
};

// export default Products;
export default connect(({ interfaceTest }) => ({
    interfaceTest,
}))(InterfaceTest);