import React from 'react';
import { Button, Modal, Form, Input, Icon, Popconfirm, Select, Radio } from 'antd';
import { warning, error } from '../SysCfgQueryFieldAlert';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class UpdateCreateForm extends React.Component {

    constructor(props) {
        super();
        let sysInfos = [];
        let sysTableInfos = {};
        let sysTableChnInfos = {};
        let moduleInfos = {};
        let moduleChnInfos = {};
        let sysTableColumnInfos = {};
        let sysTableColumnChnInfos = {};
        for (let i = 0; i < props.allSys.length; i++) {
            if (sysInfos.indexOf(props.allSys[i].sysAlias) <= -1) {
                sysInfos.push(props.allSys[i].sysAlias);
            }

            if (props.allSys[i].ohsModuleConfigs != null) {
                let moduleInfo = [];
                let moduleChnInfo = [];
                for (let j = 0; j < props.allSys[i].ohsModuleConfigs.length; j++) {
                    moduleInfo.push(props.allSys[i].ohsModuleConfigs[j].moduleAlias);
                    moduleChnInfo[props.allSys[i].ohsModuleConfigs[j].moduleAlias] = props.allSys[i].ohsModuleConfigs[j].moduleName;
                }
                moduleInfos[props.allSys[i].sysAlias] = moduleInfo;
                moduleChnInfos[props.allSys[i].sysAlias] = moduleChnInfo;
            }

            if (props.allSys[i].ohsTableConfigs != null) {
                let sysTableInfoss = [];
                let sysTableChnInfo = {};
                if (props.allSys[i].ohsTableConfigs != null) {
                    for (let j = 0; j < props.allSys[i].ohsTableConfigs.length; j++) {
                        sysTableInfoss.push(props.allSys[i].ohsTableConfigs[j].tableName);
                        sysTableChnInfo[props.allSys[i].ohsTableConfigs[j].tableName] = props.allSys[i].ohsTableConfigs[j].tableChnName;
                        if (props.allSys[i].ohsTableConfigs[j].columns != null) {
                            // 遍历columns
                            let sysTableColumnInfo = [];
                            let sysTableColumnChnInfo = [];
                            for (let k = 0; k < props.allSys[i].ohsTableConfigs[j].columns.length; k++) {
                                if (sysTableColumnInfo.indexOf(props.allSys[i].ohsTableConfigs[j].columns[k].columnName) === -1) {
                                    sysTableColumnInfo.push(props.allSys[i].ohsTableConfigs[j].columns[k].columnName);
                                }
                                sysTableColumnChnInfo[props.allSys[i].ohsTableConfigs[j].columns[k].columnName] = props.allSys[i].ohsTableConfigs[j].columns[k].columnAlias;
                            }
                            sysTableColumnInfos[props.allSys[i].ohsTableConfigs[j].tableName] = sysTableColumnInfo;
                            sysTableColumnChnInfos[props.allSys[i].ohsTableConfigs[j].tableName] = sysTableColumnChnInfo;
                        }
                    }
                    sysTableInfos[props.allSys[i].sysAlias] = sysTableInfoss;
                    sysTableChnInfos[props.allSys[i].sysAlias] = sysTableChnInfo;
                }
            }
        }
        this.state = {
            tables: [],
            secondCity: '',
            sysInfos: sysInfos,
            sysTableInfos: sysTableInfos,
            sysTableChnInfos: sysTableChnInfos,
            moduleInfos: moduleInfos,
            moduleChnInfos: moduleChnInfos,
            sysTableColumnInfos: sysTableColumnInfos,
            sysTableColumnChnInfos: sysTableColumnChnInfos,
            currentSys: props.records['sysAlias'],
            currentTableChn: sysTableChnInfos[props.records['sysAlias']],
            currentColumns: sysTableColumnInfos[props.records['tableName']],
            currentColumnChn: sysTableColumnChnInfos[props.records['tableName']],
        }
    }

    handleSelectChange = (value) => {
        let sysTableInfos = this.state.sysTableInfos;
        let moduleInfos = this.state.moduleInfos;
        let sysTableChnInfos = this.state.sysTableChnInfos;
        let moduleChnInfos = this.state.moduleChnInfos;
        const { form, allSys } = this.props;
        let sysChineseNme;
        let schemaName;
        for (let i = 0; i < allSys.length; i++) {
            if (allSys[i].sysAlias === value) {
                sysChineseNme = allSys[i].sysChineseNme;
                schemaName = allSys[i].schemaName;
                break;
            }
        }
        form.setFieldsValue({
            sysChineseNme: sysChineseNme,
            schemaName: schemaName,
            tableName: '',
            tableChnName: '',
        });
        this.setState(Object.assign({}, this.state, {
            tables: sysTableInfos[value],
            tableChns: sysTableChnInfos[value],
            modules: moduleInfos[value],
            moduleChns: moduleChnInfos[value],
            currentSys: value,
        }));
    };

    onIsHideChange = (e) => {
        const { form, queryFields } = this.props;
        let fieldsValues = {};
        if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames.indexOf('isHide') > -1) {
            fieldsValues.isHide = e.target.value;
        }
        form.setFieldsValue(fieldsValues);
    };

    onSelectTableChange = (value) => {
        let sysTableColumnInfos = this.state.sysTableColumnInfos;
        let sysTableColumnChnInfos = this.state.sysTableColumnChnInfos;
        this.setState({
            secondCity: value,
        });
        const { form, queryFields } = this.props;
        if (queryFields.dataName === 'enumValueConfig'
            && (sysTableColumnInfos[value] == null || (sysTableColumnInfos[value] != null && sysTableColumnInfos[value][0] == null))) {
            error(value + "该表下不存在字段信息，请在“字段配置”中先添加对应表的字段信息！");
            return;
        }
        let fieldsValues = {};
        if ((queryFields.dataName === 'singleSqlConfig' || queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig')
            && queryFields.fieldNames.indexOf('tableChnName') > -1) {
            if (this.state.tableChns != null) {
                fieldsValues.tableChnName = this.state.tableChns[value];
            } else {
                fieldsValues.tableChnName = this.state.currentTableChn[value];
            }
        }
        form.setFieldsValue(fieldsValues);
        this.setState(Object.assign({}, this.state, {
            columns: sysTableColumnInfos[value],
            columnsChns: sysTableColumnChnInfos[value],
            currentColumns: sysTableColumnInfos[value],
            currentColumnChn: sysTableColumnChnInfos[value],
        }));
    }

    onColumnAliasChange = (value) => {
        const { form, queryFields } = this.props;
        let fieldsValues = {};
        if ((queryFields.dataName === 'enumValueConfig' || queryFields.dataName === 'singleSqlConfig')
            && queryFields.fieldNames.indexOf('columnAlias') > -1) {
            if (this.state.columnsChns != null) {
                fieldsValues.columnAlias = this.state.columnsChns[value];
            } else {
                fieldsValues.columnAlias = this.state.currentColumnChn[value];
            }
        }
        form.setFieldsValue(fieldsValues);
    }

    render() {
        const tableOptions = (this.state.tables || []).map(table => <Option key={table}>{table}</Option>);
        const { visible, onCancel, onCreate, form, records, queryFields, allSys } = this.props;
        const { getFieldDecorator } = form;

        const formItem = [];
        for (let i = 0; i < queryFields.fieldNames.length; i++) {
            if (queryFields.fieldNames[i] === 'sysAlias') {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]], //这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                            onChange: this.handleSelectChange,
                        })(
                            <Select placeholder="请选择系统码">
                                {
                                    allSys.map(item => {
                                        return <Option key={item.id} value={item.sysAlias}>{item.sysAlias}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                )
            } else if ((queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig' || queryFields.dataName === 'singleSqlConfig')
                && queryFields.fieldNames[i] === 'tableName') {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]], //这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                            onChange: this.onSelectTableChange,
                        })(
                            <Select placeholder="请选择表名" notFoundContent="当前系统下不存在表信息，请在“表配置”中先添加对应系统的表信息！">
                                {
                                    (this.state.sysTableInfos[this.state.currentSys] || []).map(table => <Option key={table}>{table}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                )
            } else if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames[i] === 'isHide') {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]],
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                            onChange: this.onIsHideChange
                        })(
                            <RadioGroup>
                                <Radio value={"1"}>{'是'}</Radio>
                                <Radio value={"0"}>{'否'}</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>)
            } else if ((queryFields.dataName === 'singleSqlConfig' || queryFields.dataName === 'enumValueConfig') && queryFields.fieldNames[i] === 'columnName') {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]],
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                            onChange: this.onColumnAliasChange
                        })(
                            <Select placeholder="请选择字段名" notFoundContent="该表下不存在字段信息，请在“字段配置”中先添加对应表的字段信息！">
                                {
                                    (this.state.currentColumns || []).map(column => <Option key={column}>{column}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>)
            } else {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]], //这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                        })(
                            <Input disabled={
                                (
                                    queryFields.fieldNames[i] === 'sysChineseNme' || queryFields.fieldNames[i] === 'schemaName'
                                    || (queryFields.fieldNames[i] === 'tableChnName' && queryFields.dataName === 'singleSqlConfig')
                                    || (queryFields.fieldNames[i] === 'tableChnName' && queryFields.dataName === 'columnConfig')
                                    || (queryFields.fieldNames[i] === 'tableChnName' && queryFields.dataName === 'enumValueConfig')
                                    || (queryFields.fieldNames[i] === 'moduleName' && queryFields.dataName === 'singleSqlConfig')
                                    || (queryFields.fieldNames[i] === 'columnAlias' && queryFields.dataName === 'singleSqlConfig')
                                    || (queryFields.fieldNames[i] === 'columnAlias' && queryFields.dataName === 'enumValueConfig')
                                )
                                    ? true : false} />
                        )}
                    </FormItem>
                )
            }
        }

        return (
            <Modal
                visible={visible}
                title={queryFields.updateTitle}
                okText="修改"
                onCancel={onCancel}
                onOk={onCreate}
                cancelText="取消"
            >
                <Form layout="vertical">
                    {
                        formItem.map((item) => {
                            return item;
                        })
                    }
                </Form>
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(UpdateCreateForm);

export class CommonUpdateField extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                error(err);
                return;
            }
            const records = this.props.records;
            const queryFields = this.props.queryFields;
            let isChange;
            for (let i = 0; i < queryFields.fieldNames.length; i++) {
                if (records[queryFields.fieldNames[i]] !== values[queryFields.fieldNames[i]]) {
                    isChange = true;
                    break;
                }
            }
            if (isChange) {
                form.resetFields();
                this.setState({ visible: false });
                values.id = records.id;
                this.props.onUpdate(values);
            } else {
                warning("数据未发生任何修改！");
            }
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>修改<Icon type="edit" /></Button>
                <span className="ant-divider" />
                &nbsp;&nbsp;&nbsp;
                <Popconfirm title="确定删除吗?" onConfirm={() => this.props.onDelete(this.props.records)} okText="确定" cancelText="取消">
                    <Button>删除<Icon type="delete" /></Button>
                    <span className="ant-divider" />
                </Popconfirm>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    records={this.props.records}
                    queryFields={this.props.queryFields}
                    allSys={this.props.allSys}
                />
            </div>
        );
    }
}