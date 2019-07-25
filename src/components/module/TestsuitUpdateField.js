import React from 'react';
import { Button, Modal, Form, Input, Icon, Popconfirm, Select, Table, InputNumber } from 'antd';
import { error } from './SysCfgQueryFieldAlert';
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
            this.props.saveTestsuitRecords(values);
            this.setState({ visible: false });
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
        let interfaceMapping = {};
        if (props.records.notInInterface != null) {
            notInInterface = props.records.notInInterface.map((notInInter, index) => {
                if (notInInter) {
                    if (notInInter.interfaceAlias) {
                        interfaceMapping[notInInter.interfaceAlias] = notInInter.interfaceName;
                    }
                    return (<Option key={index} value={notInInter.interfaceAlias}>{notInInter.interfaceAlias}</Option>);
                }
                return null;
            })
        }
        let inInterface = [];
        if (props.records.inInterfaces != null) {
            props.records.inInterfaces.map((inInter, index) => {
                if (inInter) {
                    inInterface.push({
                        key: index,
                        id: inInter.id,
                        testSeq: inInter.testSeq,
                        interfaceAlias: inInter.interfaceAlias,
                        interfaceName: inInter.interfaceName,
                    });
                }
                return null;
            })

        }
        this.state = {
            notInInterface: notInInterface,
            inInterface: inInterface,
            interfaceName: null,
            interfaceMapping: interfaceMapping,
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
        this.doOnChange = this.doOnChange.bind(this)

    }

    deleteTestsuit(value) {
        this.props.deleteRecordsById(value);
        let result = [];
        this.state.inInterface.map(inter => {
            if (inter) {
                if (inter.id !== value.id) {
                    result.push(inter);
                }
            }
            return null;
        });
        let copyNotInInterface = [];
        (this.props.records.notInInterface || []).map((notInInter) => {
            if (notInInter) {
                copyNotInInterface.push(Object.assign({}, notInInter));
            }
            return null;
        })
        copyNotInInterface.push({
            id: value.id,
            interfaceAlias: value.interfaceAlias,
            interfaceName: value.interfaceName,
            
        })
        let interfaceMapping = {};
        let notInInterface = copyNotInInterface.map((notInInter, index) => {
            if (notInInter) {
                interfaceMapping[notInInter.interfaceAlias] = notInInter.interfaceName;
                return (<Option key={index} value={notInInter.interfaceAlias}>{notInInter.interfaceAlias}</Option>);
            }
            return null;
        });

        this.setState({
            inInterface: result,
            notInInterface: notInInterface,
            interfaceMapping : interfaceMapping
        });
    }

    doOnChange(value) {
        this.setState({
            interfaceName: this.state.interfaceMapping[value]
        })
    }

    render() {
        const { visible, onCancel, onCreate, form, records } = this.props;
        const { getFieldDecorator } = form;

        const formItem = [];

        formItem.push(
            <FormItem key={0} label={'当前测试案例'}>
                {getFieldDecorator('id', {
                    initialValue: records['id'],
                })(
                    <Input readOnly />
                )}
            </FormItem>
        );

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
                {getFieldDecorator('moduleName', {
                    initialValue: records['moduleName'],
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
            <FormItem key={5} label={'接口别名'}>
                {getFieldDecorator('interfaceAlias', {
                    rules: [{ required: true, message: '请选择可选接口别名!' }],
                    onChange: this.doOnChange,
                })(
                    <Select placeholder="请选择对应接口">{this.state.notInInterface}</Select>

                )}
            </FormItem>
        );
        formItem.push(
            <FormItem key={8} label={'接口名称'}>
                {getFieldDecorator('interfaceName', {
                    rules: [{ required: true, message: '请选择可选接口名称!' }],
                    initialValue: this.state.interfaceName,
                })(
                    <Input readOnly />

                )}
            </FormItem>
        );
        formItem.push(
            <FormItem key={6} label={'顺序'}>
                {getFieldDecorator('testSeq', {
                    rules: [{ required: true, message: '请输入顺序号!' }],
                })(
                    <InputNumber min={1} max={10} />
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

