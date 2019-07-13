import React from 'react';
import { Form, Row, Col, Input, Button, Select } from 'antd';

const { Option } = Select;

class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props);
       
        let selectModules;
        let selectEnvs;
        if (this.props.modules.modules != null) {
            selectModules = this.props.modules.modules.map(module => {

                if (module.envInfo != null) {
                    selectEnvs = module.envInfo.map(envInf => {
                        return <Option key={envInf} value={envInf.envId}> {envInf.envAlias}</Option>
                    });
                }

                return <Option key={module} value={module.moduleAlias}> {module.moduleName}</Option>
            })


        }
        this.state = {
            modules: selectModules,
            whereInfo: null,
            envInfos: selectEnvs,

        }

        this.onChange = this.onChange.bind(this);

    }

    onChange(value) {
        this.setState({ whereInfo: value })
    }

    getSelectWhereInfo(value) {
        const { getFieldDecorator } = this.props.form;
        if (this.props.modules.modules != null) {
            const selectWhereInfo = this.props.modules.modules.map(module => {

                if (module.moduleAlias === value && module.whereInfo != null) {
                    return module.whereInfo.map(whereInf => {
                        return (
                            <Col span={4} key={whereInf['keyInfo']}>
                                <Form.Item label={whereInf['keyChnInfo']}>
                                    {getFieldDecorator(whereInf['keyInfo'], {
                                        rules: [{ required: true, message: '请输入' + whereInf['keyChnInfo'] }],
                                    })(<Input placeholder={'请输入' + whereInf['keyChnInfo']} />)}
                                </Form.Item>
                            </Col>
                        )
                    })
                }

                return null
            })
            return selectWhereInfo
        }
    }

    getFields() {
        const { getFieldDecorator } = this.props.form;
        const itemList = ['系统码', '系统名', '模块名', '环境'];
        const itemAliasList = ['sysAlias', 'sysChineseNme', 'moduleAlias', 'envInfo'];
        const children = [];
        children.push(
            <Col span={4} key={0}>
                <Form.Item label={itemList[0]}>
                    {getFieldDecorator(itemAliasList[0], {
                        initialValue: this.props.currentSysAlias,
                    })(
                        <Input readOnly />
                    )}
                </Form.Item>
            </Col>,
        );


        children.push(
            <Col span={4} key={1}>
                <Form.Item label={itemList[1]}>
                    {getFieldDecorator(itemAliasList[1], {
                        initialValue: this.props.modules.modules != null ? this.props.modules.modules[0].sysChineseNme : null,
                    })(
                        <Input readOnly />
                    )}
                </Form.Item>
            </Col>,
        );




        children.push(
            <Col span={4} key={2}>
                <Form.Item label={itemList[2]}>
                    {getFieldDecorator(itemAliasList[2], {
                        rules: [{ required: true, message: '请选择模块！' }],
                    })(
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择模块"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.modules}
                        </Select>
                    )}

                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={4} key={3}>
                <Form.Item label={itemList[3]}>
                    {getFieldDecorator(itemAliasList[3], {
                        rules: [{ required: true, message: '请选择环境！' }],
                    })(
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择环境"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.envInfos}
                        </Select>
                    )}

                </Form.Item>
            </Col>,
        );

        return children;
    }


    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            console.log(this.props)
            this.props.querySubmit(values)
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {

        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields()}{this.getSelectWhereInfo(this.state.whereInfo)}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}


const DataQueryForm = (props) => {
    const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
    console.log(props)
    return (
        <div>
            <WrappedAdvancedSearchForm currentSysAlias={props.currentSysAlias} modules={props.data} querySubmit={props.querySubmit} />
        </div>
    );
}

export default DataQueryForm;
