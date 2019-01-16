import { Table } from 'antd';
import { SysCfgUpdateField } from './SysCfgUpdateField';

export function SysCfgDataField(props) {

    const columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '系统名',
        dataIndex: 'sysChineseNme',
        key: 'sysChineseNme',
    }, {
        title: '系统码',
        dataIndex: 'sysAlias',
        key: 'sysAlias',
    }, {
        title: 'Schema名',
        dataIndex: 'schemaName',
        key: 'schemaName',
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
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <SysCfgUpdateField onDelete={props.onDelete} records={record} onUpdate={props.onUpdate}/>
            </span>
        ),
    }];

    (props.data.systemConfig || []).map((sysConfig, index) => {
        sysConfig.key = sysConfig.id;
        sysConfig.createUser = sysConfig.createUser;
        sysConfig.createDate = sysConfig.createDate;
        sysConfig.updateUser = sysConfig.updateUser;
        sysConfig.updateDate = sysConfig.updateDate;
        return sysConfig;
    })
    return <Table columns={columns} dataSource={props.data.systemConfig} bordered />;
}