import React from 'react';
import { Button, Modal, Form, Input, Icon, Popconfirm, Select, Radio, Card, Checkbox, Table, InputNumber } from 'antd';
import { warning, error } from './SysCfgQueryFieldAlert';
const FormItem = Form.Item;
const Option = Select.Option;



export class TestsuitUpdateField extends React.Component {
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
            console.log(values)
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
        const TestsuitCollectionCreateForm = Form.create()(TestsuitCreateForm);
        return (
            <div>
                <Button onClick={this.showModal}>接口<Icon type="edit" /></Button>
                <span className="ant-divider" />
                <TestsuitCollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    records={this.props.records}
                    queryFields={this.props.queryFields}
                    allSys={this.props.allSys}
                    deleteRecordsById={this.props.deleteRecordsById}
                />
            </div>
        );
    }
}



const columns = [
    {
        title: '主键',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '顺序',
        dataIndex: 'testSeq',
        key: 'testSeq',
    },
    {
        title: '接口别名',
        dataIndex: 'interfaceAlias',
        key: 'interfaceAlias',
    },
    {
        title: '接口名',
        dataIndex: 'interfaceName',
        key: 'interfaceName',
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 100,
    }

];

class TestsuitCreateForm extends React.Component {

    constructor(props) {
        super(props);
        let notInInterface;
        if (props.records.notInInterface != null) {
            notInInterface = props.records.notInInterface.map((notInInter, index) => {
                return (<Option key={index} value={notInInter.interfaceAlias}>{notInInter.interfaceName}</Option>);
            })
        }
        let inInterface = [];
        if (props.records.inInterfaces != null) {
            props.records.inInterfaces.map((inInter, index) => {
                inInterface.push({
                    key: index,
                    id: inInter.id,
                    testSeq: inInter.testSeq,
                    interfaceAlias: inInter.interfaceAlias,
                    interfaceName: inInter.interfaceName,
                });
                return null;
            })

        }
        this.state = {
            notInInterface: notInInterface,
            inInterface: inInterface,
        }
        columns[4].render = (text, record) => (
            <span>
                <Popconfirm title="确定删除吗?" onConfirm={() => this.deleteTestsuit(record)} okText="确定" cancelText="取消">
                    <Button>删除<Icon type="delete" /></Button>
                    <span className="ant-divider" />
                </Popconfirm>
            </span>
        );
        this.deleteTestsuit = this.deleteTestsuit.bind(this)

    }

    deleteTestsuit(value) {
        this.props.deleteRecordsById(value);
        let result = this.state.inInterface.map(inter =>　{
            if (inter.id !== value.id) {
                return inter;
            }
        });

        if (result[0] === undefined) {
            result = [];
        }

        let copyNotInInterface = [];
        this.props.records.notInInterface.map((notInInter) => {
            copyNotInInterface.push(Object.assign({}, notInInter));
            return null;
        })
        copyNotInInterface.push({
            id: value.id,
            interfaceAlias: value.interfaceAlias,
            interfaceName: value.interfaceName,

        })
        let notInInterface = copyNotInInterface.map((notInInter, index) => {
            return (<Option key={index} value={notInInter.interfaceAlias}>{notInInter.interfaceName}</Option>);
        });

        this.setState({
            inInterface : result,
            notInInterface: notInInterface,
        });
    }


    render() {
        const { visible, onCancel, onCreate, form, records } = this.props;
        const { getFieldDecorator } = form;

        const formItem = [];

        formItem.push(
            <FormItem key={1} label={'系统码'}>
                {getFieldDecorator('sysAlias', {
                    initialValue: records['sysAlias'],
                })(
                    <Input readOnly />
                )}
            </FormItem>
        );
        formItem.push(
            <FormItem key={2} label={'系统名'}>
                {getFieldDecorator('sysChineseNme', {
                    initialValue: records['sysChineseNme'],
                })(
                    <Input readOnly />
                )}
            </FormItem>
        );
        formItem.push(
            <FormItem key={3} label={'模块码'}>
                {getFieldDecorator('moduleAlias', {
                    initialValue: records['moduleAlias'],
                })(
                    <Input readOnly />
                )}
            </FormItem>
        );
        formItem.push(
            <FormItem key={4} label={'模块名'}>
                {getFieldDecorator('sysChineseNme', {
                    initialValue: records['sysChineseNme'],
                })(
                    <Input readOnly />
                )}
            </FormItem>
        );
        formItem.push(
            <FormItem key={7} label={'接口信息'}>
                <Table bordered columns={columns} dataSource={this.state.inInterface} />
            </FormItem>
        );
        formItem.push(
            <FormItem key={5} label={'可选接口'}>
                {getFieldDecorator('alternativeInter', {
                    rules: [{ required: true, message: '请选择可选接口!' }],
                })(
                    <Select placeholder="请选择对应接口">{this.state.notInInterface}</Select>
                    
                )}
            </FormItem>
        );
        formItem.push(
            <FormItem key={6} label={'顺序'}>
                {getFieldDecorator('testSeq', {
                    rules: [{ required: true, message: '请输入顺序号!' }],
                })(
                    <InputNumber min={1} max={10}/>
                )}
            </FormItem>
        );
        return (
            <Modal
                visible={visible}
                title={'接口配置'}
                okText="新增"
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

