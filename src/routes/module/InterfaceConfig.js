import React from 'react';
import { connect } from 'dva';
import CommonQueryField from '../../components/module/common/CommonQueryField'

const queryFields = {
    scroll: {  x: 3000, y: 500  },
    dataName: 'interfaceConfig',
    updateTitle: '修改接口信息',
    addTitle: '新增接口信息',
    fieldDescs: ['系统码', '系统名', '模块码', '模块名', '访问路径', '方法', '接口类型', '接口名', '接口别名', '请求报文模板', '响应报文模板'],
    fieldNames: ['sysAlias', 'sysChineseNme', 'moduleAlias', 'moduleName', 'urlPath', 'method', 'interfaceType', 'interfaceName', 'interfaceAlias', 'requestTemplate', 'responseTemplate'],
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
    title: '模块码',
    dataIndex: 'moduleAlias',
    width: 100,
    key: 'moduleAlias',
}, {
    title: '模块名',
    dataIndex: 'moduleName',
    width: 100,
    key: 'moduleName',
}, {
    title: '访问路径',
    dataIndex: 'urlPath',
    key: 'urlPath',
}, {
    title: '方法',
    dataIndex: 'method',
    width: 80,
    key: 'method',
},{
    title: '接口类型',
    dataIndex: 'interfaceType',
    width: 200,
    key: 'interfaceType',
},{
    title: '接口名',
    dataIndex: 'interfaceName',
    width: 200,
    key: 'interfaceName',
},{
    title: '接口别名',
    dataIndex: 'interfaceAlias',
    width: 200,
    key: 'interfaceAlias',
}, {
    title: '请求报文',
    dataIndex: 'requestTemplate',
    width: 100,
    key: 'requestTemplate',
},{
    title: '响应报文',
    dataIndex: 'responseTemplate',
    width: 100,
    key: 'responseTemplate',
},{
    title: '创建者',
    dataIndex: 'createUser',
    width: 200,
    key: 'createUser',
}, {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 200,
    key: 'createDate',
}, {
    title: '修改者',
    dataIndex: 'updateUser',
    width: 200,
    key: 'updateUser',
}, {
    title: '修改时间',
    dataIndex: 'updateDate',
    width: 200,
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