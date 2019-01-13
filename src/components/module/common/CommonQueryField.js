import React from 'react';

import { Form, Row, Col, Input, Button } from 'antd';
import { CommonDataField } from './CommonDataField';
import { CommonAddField } from './CommonAddField';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {

  constructor(props) {
    super();
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let querySys = {};
      const queryFields = this.props.queryFields;
      for (let i = 0; i < queryFields.fieldNames.length; i++) {
        querySys[queryFields.fieldNames[i]] = values[queryFields.fieldNames[i]];
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
    const queryFields = this.props.queryFields;
    for (let i = 0; i < queryFields.fieldDescs.length; i++) {
      children.push(
        <Col span={6} key={i}>
          <FormItem {...formItemLayout} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i])(
              <Input placeholder={"请输入" + queryFields.fieldDescs[i]} />
            )}
          </FormItem>
        </Col>
      );
    }

    if (queryFields.fieldDescs.length % 4 === 0) {
      for (let i = 0; i < 2; i++) {
        let index = queryFields.fieldDescs.length + i;
        children.push(
          <Col span={6} key={index}>
          </Col>
        );
      }
    }

    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, children.length)}
          <Col span={6} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空查询条件</Button>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <CommonAddField save={this.props.save} queryFields={this.props.queryFields}
              data={this.props.data}
            />
          </Col>
        </Row>
        <br />
        <CommonDataField data={this.props.data} columns={this.props.columns}
          onDelete={this.handleDelete} onUpdate={this.props.update}
          queryFields={this.props.queryFields}
        />

      </Form>
    );
  }
}


const CommonQueryField = (props) => {
  const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
  return (
    <div>
      <WrappedAdvancedSearchForm query={props.query} data={props.data}
        save={props.save} delete={props.delete} update={props.update}
        queryFields={props.queryFields} columns={props.columns}
      />
    </div>
  );
};

export default CommonQueryField;
