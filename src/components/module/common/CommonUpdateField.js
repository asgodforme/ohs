import React from 'react';
import { Button, Modal, Form, Input, Icon, Popconfirm } from 'antd';
import { warning, error } from '../SysCfgQueryFieldAlert';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, records, queryFields } = props;
        const { getFieldDecorator } = form;

        const formItem = [];
        for (let i = 0; i < queryFields.fieldNames.length; i++) {
            formItem.push(
                <FormItem key={i} label={queryFields.fieldDescs[i]}>
                    {getFieldDecorator(queryFields.fieldNames[i], {
                        initialValue: records[queryFields.fieldNames[i]], //这是用来初始化表单数据的
                        rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
            )
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
                <Popconfirm title="确定删除吗?" onConfirm={() => this.props.onDelete(this.props.records.id)} okText="确定" cancelText="取消">
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
                />
            </div>
        );
    }
}