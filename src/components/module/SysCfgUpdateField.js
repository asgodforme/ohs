import React from 'react';
import { Button, Modal, Form, Input, Icon, Popconfirm } from 'antd';
import { warning } from './SysCfgQueryFieldAlert';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, records } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="修改"
                okText="修改"
                onCancel={onCancel}
                onOk={onCreate}
                cancelText="取消"
            >
                <Form layout="vertical">
                    <FormItem label="系统码">
                        {getFieldDecorator('sysAlias', {
                            initialValue: records.sysAlias,//这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入系统码！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="系统名">
                        {getFieldDecorator('sysChineseNme', {
                            initialValue: records.sysChineseNme,//这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入系统名！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Schema">
                        {getFieldDecorator('schemaName', {
                            initialValue: records.schemaName,//这是用来初始化表单数据的
                            rules: [{ required: true, message: '请输入Schema！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

export class SysCfgUpdateField extends React.Component {
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
                return;
            }
            const records = this.props.records;
            if (records.sysAlias !== values.sysAlias 
                || records.sysChineseNme !== values.sysChineseNme
                || records.schemaName !== values.schemaName) {
                form.resetFields();
                this.setState({ visible: false });
                values.id = records.id;
                this.props.onUpdate(values);
            } else {
                warning("数据未发生任何变化！");
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
                />
            </div>
        );
    }
}