import React from 'react';

import { Form, Row, Col, Input, Button, Radio, Select } from 'antd';
import { CommonDataField } from './CommonDataField';
import { CommonAddField } from './CommonAddField';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;


const notQueryKey = [
  'requestTemplate', 'responseTemplate', 'preOprUrl', 'preReqOprData', 'preRspDataRegx', 'afterOperUrl', 'afterReqOprData', 'afterRspDataRegx'
];

class AdvancedSearchForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      queryParm: props.data.queryParm,
      ohsPagination: {
        current: props.data[props.queryFields.dataName].number + 1,
        pageSize: props.data[props.queryFields.dataName].size,
        onChange: this.doPagination,
        total: props.data[props.queryFields.dataName].totalElements,
      },
    }

    // if (props.data[props.queryFields.dataName].content.length === 0) {
    //   info("无数据显示，请点击查询按钮查询！");
    // }


    // console.log(this.state)
  }

  doPagination = (page, pageSize) => {
    let querySys = {};
    const queryFields = this.props.queryFields;
    for (let i = 0; i < queryFields.fieldNames.length; i++) {
      querySys[queryFields.fieldNames[i]] = this.state.queryParm[queryFields.fieldNames[i]];
    }
    querySys['current'] = page;
    querySys['pageSize'] = pageSize;
    this.props.query(querySys);
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let querySys = {};
      const queryFields = this.props.queryFields;
      for (let i = 0; i < queryFields.fieldNames.length; i++) {
        querySys[queryFields.fieldNames[i]] = values[queryFields.fieldNames[i]];
      }
      querySys['current'] = this.state.ohsPagination.current;
      querySys['pageSize'] = this.state.ohsPagination.pageSize;
      this.props.query(querySys);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    let fieldValues = {};
    const queryFields = this.props.queryFields;
    for (let i = 0; i < queryFields.fieldNames.length; i++) {
      fieldValues[queryFields.fieldNames[i]] = '';
    }
    this.props.form.setFieldsValue(fieldValues);
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
      if (queryFields.fieldNames[i] === 'password') {
        children.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i])(
                <Input placeholder={"不支持输入" + queryFields.fieldDescs[i] + "条件查询"} disabled={true} />
              )}
            </FormItem>
          </Col>
        );
      } else if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames[i] === 'isHide') {
        children.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i], {
                initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
              })(
                <RadioGroup>
                  <Radio value={"1"}>{'是'}</Radio>
                  <Radio value={"0"}>{'否'}</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>);
      } else if (queryFields.dataName === 'evnConfig' && queryFields.fieldNames[i] === 'evnTyp') {
        children.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i], {
                initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
              })(
                <RadioGroup>
                  <Radio value={"1"}>{'数据库'}</Radio>
                  <Radio value={"0"}>{'应用服务器'}</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>);
      } else if (queryFields.dataName === 'evnConfig' && queryFields.fieldNames[i] === 'dbType') {
        children.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i], {
                initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
              })(
                <Select>
                  <Option value={"0"}>{'MYSQL'}</Option>
                  <Option value={"1"}>{'ORACLE'}</Option>
                  <Option value={"2"}>{'DB2'}</Option>
                </Select>
              )}
            </FormItem>
          </Col>);
      } else {
        if (notQueryKey.indexOf(queryFields.fieldNames[i]) == -1) {
          children.push(
            <Col span={6} key={i}>
              <FormItem {...formItemLayout} label={queryFields.fieldDescs[i]}>
                {getFieldDecorator(queryFields.fieldNames[i], {
                  initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
                })(
                  <Input placeholder={"请输入" + queryFields.fieldDescs[i]} />
                )}
              </FormItem>
            </Col>
          );
        }
        
      }
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
              data={this.props.data} getAllSys={this.props.getAllSys}
            />
          </Col>
        </Row>
        <br />
        <CommonDataField data={this.props.data} columns={this.props.columns}
          onDelete={this.handleDelete} onUpdate={this.props.update}
          queryFields={this.props.queryFields} ohsPagination={this.state.ohsPagination}
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
        queryFields={props.queryFields} columns={props.columns} getAllSys={props.getAllSys}
      />
    </div>
  );
};

export default CommonQueryField;
