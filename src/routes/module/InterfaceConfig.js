import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
    scroll: {},
    dataName: 'interfaceConfig',
    updateTitle: '修改接口信息',
    addTitle: '新增接口信息',
    fieldDescs: ['系统码', '系统名', '模块码', '模块名', '访问路径', '方法'],
    fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName', 'urlPath', 'method',],
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

const InterfaceConfig = ({ dispatch, interfaceConfig }) => {
    function getAllInterface(interfaceConfig) {
        dispatch({
            type: 'interfaceConfig/getAllInterface',
            payload: interfaceConfig,
        });
    }
    function saveInterfaceConfig(interfaceConfig) {
        dispatch({
            type: 'interfaceConfig/saveInterfaceConfig',
            payload: interfaceConfig,
        });
    }
    function deleteInterfaceConfig(interfaceConfig) {
        dispatch({
            type: 'interfaceConfig/deleteById',
            payload: interfaceConfig,
        });
    }
    function updateInterface(interfaceConfig) {
        dispatch({
            type: 'interfaceConfig/updateById',
            payload: interfaceConfig,
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
            <CommonQueryField query={getAllInterface} data={interfaceConfig}
                save={saveInterfaceConfig} delete={deleteInterfaceConfig} update={updateInterface}
                queryFields={queryFields} columns={columns} getAllSys={getAllSys}
            />
        </div>
    );
};

// export default Products;
export default connect(({ interfaceConfig }) => ({
    interfaceConfig,
}))(InterfaceConfig);