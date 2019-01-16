import React from 'react';

import { Form, Row, Col, Input, Button } from 'antd';
import { SysCfgDataField } from './SysCfgDataField';
import { SysCfgAddField } from './SysCfgAddField';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {

  constructor(props) {
    super();
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let querySys = {
        sysAlias: values['sysAlias'],
        sysChineseNme: values['sysChineseNme'],
      }
      this.props.query(querySys);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleDelete = (id) => {
    this.props.delete(id);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const children = [];
    const fieldDescs = ['系统码', '系统名', 'Schema'];
    const fieldNames = ['sysAlias', 'sysChineseNme', 'Schema']
    for (let i = 0; i < fieldDescs.length; i++) {
      children.push(
        <Col span={4} key={i}>
          <FormItem {...formItemLayout} label={fieldDescs[i]}>
            {getFieldDecorator(fieldNames[i])(
              <Input placeholder={"请输入" + fieldDescs[i]} />
            )}
          </FormItem>
        </Col>
      );
    }

    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, children.length)}
          <Col span={6} style={{ textAlign: 'left' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空查询条件</Button>
          </Col>
          <Col span={6} style={{ textAlign: 'left' }}>
            <SysCfgAddField save={this.props.save} />
          </Col>
        </Row>
        <SysCfgDataField data={this.props.data} onDelete={this.handleDelete} onUpdate={this.props.update} />

      </Form>
    );
  }
}


const SysCfgQueryField = (props) => {
  const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
  return (
    <div>
      <WrappedAdvancedSearchForm query={props.query} data={props.data} save={props.save} delete={props.delete} update={props.update} />
    </div>
  );
};

export default SysCfgQueryField;
