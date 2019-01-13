import { Table, Icon, Popconfirm, Button } from 'antd';
import { CommonUpdateField } from './CommonUpdateField';

export function CommonDataField(props) {
    const columns = props.columns.concat();
    columns.push({
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <CommonUpdateField onDelete={props.onDelete} records={record} onUpdate={props.onUpdate}
                    queryFields={props.queryFields}
                />
            </span>
        ),
    });

    console.log(props);
    if (props.data != null) {
        (props.data[props.queryFields['dataName']] || []).map((sysConfig, index) => {
            sysConfig.key = sysConfig.id;
            sysConfig.createUser = sysConfig.createUser;
            sysConfig.createDate = sysConfig.createDate;
            sysConfig.updateUser = sysConfig.updateUser;
            sysConfig.updateDate = sysConfig.updateDate;
        })
    }

    return <Table columns={columns} dataSource={props.data != null?props.data[props.queryFields['dataName']]:null} bordered />;
}