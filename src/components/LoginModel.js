import React from 'react';
import { Form, Col, Input, Modal, Select } from 'antd';
import { error, warning } from './module/SysCfgQueryFieldAlert';
const Option = Select.Option;
const FormItem = Form.Item;
export class LoginModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: true };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.user ? false : true
        });
    }

    handleOk = (e) => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                e.preventDefault();
                error(err);
                return;
            }
            values.isFirstLogin = 'Y';
            this.setState({ visible: false });
            this.props.saveUserConfig(values);
        });

    };

    handleCancel = e => {
        e.preventDefault();
        warning("随便选择输入你的大名！我将铭记一生~");
    };

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const LoginModelCreateForm = Form.create()(LoginModelForm);
        return (
            <div>
                <LoginModelCreateForm
                    ref={this.saveFormRef}
                    content={this.props}
                    title={this.props.title}
                    visible={this.state.visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                />
            </div>
        );
    }

}
export class LoginModelForm extends React.Component {

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const { getFieldDecorator } = this.props.form;
        const children = [];
        if ((this.props.content.users || []).length >= 1) {
            children.push(
                <Col span={25} key={1}>
                    <FormItem {...formItemLayout} label={'已有用户名'}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Select>
                                {
                                    (this.props.content.users || []).map((column) => <Option key={column}>{column}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                </Col>
            );
            children.push(
                <Col span={25} key={2}>
                    <FormItem {...formItemLayout} label={'选中用户名'}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input placeholder={"请输入用户名!"} />
                        )}
                    </FormItem>
                </Col>
            );
        } else if ((this.props.content.users || []).length === 0) {
            children.push(
                <Col span={25} key={1}>
                    <FormItem {...formItemLayout} label={'用户名'}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input placeholder={"请输入用户名!"} />
                        )}
                    </FormItem>
                </Col>
            );
        }

        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.props.handleOk}
                closable={false}
                okText={'确定'}
                cancelText={'退出'}
                onCancel={this.props.handleCancel}
            >
                <Form layout="vertical">
                    {
                        children.map((item) => {
                            return item;
                        })
                    }
                </Form>
            </Modal >
        )
    }
}