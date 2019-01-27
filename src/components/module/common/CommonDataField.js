import { Table } from 'antd';
import { CommonUpdateField } from './CommonUpdateField';

export function CommonDataField(props) {
    const columns = props.columns.concat();
    columns.push({
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 220,
        render: (text, record) => (
            <span>
                <CommonUpdateField onDelete={props.onDelete} records={record} onUpdate={props.onUpdate}
                    queryFields={props.queryFields} allSys={props.data.allSys}
                />
            </span>
        ),
    });

    if (props.data != null) {
        (props.data[props.queryFields['dataName']].content || []).map((sysConfig, index) => {
            sysConfig.key = sysConfig.id;
            sysConfig.createUser = sysConfig.createUser;
            sysConfig.createDate = sysConfig.createDate;
            sysConfig.updateUser = sysConfig.updateUser;
            sysConfig.updateDate = sysConfig.updateDate;
            return sysConfig;
        })
    }

    return <Table columns={columns} dataSource={props.data != null ? props.data[props.queryFields['dataName']].content : null}
        bordered scroll={props.queryFields.scroll} pagination={props.ohsPagination} />;
}