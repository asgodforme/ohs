import React from 'react';
import { Button, Modal, Form, Input, Icon, Popconfirm, Select, Radio } from 'antd';
import { warning, error } from '../SysCfgQueryFieldAlert';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, records, queryFields, allSys } = props;
        const { getFieldDecorator } = form;
        var handleSelectChange = (value) => {
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
            });
        };

        var onIsHideChange = (e) => {
            const { form, queryFields } = props;
            let fieldsValues = {};
            if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames.indexOf('isHide') > -1) {
                console.log(e.target.value)
                fieldsValues.isHide = e.target.value;
            }
            form.setFieldsValue(fieldsValues);
        }

        const formItem = [];
        for (let i = 0; i < queryFields.fieldNames.length; i++) {
            if (queryFields.fieldNames[i] === 'sysAlias') {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]], //这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                            onChange: handleSelectChange,
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
            } else if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames[i] === 'isHide') {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]],
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                            onChange: onIsHideChange
                        })(
                            <RadioGroup>
                                <Radio value={"1"}>{'是'}</Radio>
                                <Radio value={"0"}>{'否'}</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>)
            } else {
                formItem.push(
                    <FormItem key={i} label={queryFields.fieldDescs[i]}>
                        {getFieldDecorator(queryFields.fieldNames[i], {
                            initialValue: records[queryFields.fieldNames[i]], //这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                        })(
                            <Input disabled={queryFields.fieldNames[i] === 'sysChineseNme' || queryFields.fieldNames[i] === 'schemaName' ? true : false} />
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
);

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