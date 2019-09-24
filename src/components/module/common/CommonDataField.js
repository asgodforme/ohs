import React from 'react';
import { Form, Col, Input, Table, Button, Modal, Select } from 'antd';
import { error } from '../SysCfgQueryFieldAlert';
import { CommonUpdateField } from './CommonUpdateField';
const FormItem = Form.Item;
const Option = Select.Option;

export function CommonDataField(props) {
  let columns;
  if (props.columns != null) {
    const operation = props.queryFields.isExeButton === 'Y' ?
      ((text, record) => (<span><ExeButton content={record} saveParameterValue={props.saveParameterValue} 
        executeInterface={props.executeInterface} /></span>)) : ((text, record) => (
        <span>
          <CommonUpdateField onDelete={props.onDelete} records={record} onUpdate={props.onUpdate}
            queryFields={props.queryFields} allSys={props.data.allSys} deleteRecordsById={props.deleteRecordsById}
            save={props.save} saveTestsuitRecords={props.saveTestsuitRecords} executeInterface={props.executeInterface}
          />
        </span>));
    columns = props.columns.concat();
    columns.push({
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 220,
      render: operation,
    });

  }

  if (props.data != null) {
    (props.data[props.queryFields['dataName']].content || []).map((sysConfig, index) => {

      if (props.queryFields['dataName'] === 'interfaceConfig') {
        if (sysConfig.requestTemplate != null && sysConfig.requestTemplate.type == null) {
          sysConfig.requestTemplate = <Reader title="请求报文模板" content={sysConfig.requestTemplate} />;
        }

        if (sysConfig.responseTemplate != null && sysConfig.responseTemplate.type == null) {
          sysConfig.responseTemplate = <Reader title="响应报文模板" content={sysConfig.responseTemplate} />;
        }

      }

      if (props.queryFields['dataName'] === 'interfaceTest') {
        if (sysConfig.requestTemplate != null && sysConfig.requestTemplate.type == null) {
          sysConfig.requestTemplate = <Reader title="请求报文" content={sysConfig.requestTemplate} />;
        }

        if (sysConfig.responseTemplate != null && sysConfig.responseTemplate.type == null) {
          sysConfig.responseTemplate = <Reader title="响应报文" content={sysConfig.responseTemplate} />;
        }
      }


      sysConfig.key = sysConfig.id;
      sysConfig.createUser = sysConfig.createUser;
      sysConfig.createDate = sysConfig.createDate;
      sysConfig.updateUser = sysConfig.updateUser;
      sysConfig.updateDate = sysConfig.updateDate;
      return sysConfig;
    })
  }

  return <Table columns={columns} dataSource={props.data != null ? props.data[props.queryFields['dataName']].content : null}
    bordered scroll={props.queryFields.scroll} pagination={props.ohsPagination} />;
}

class ExeButton extends React.Component {

  render() {
    return (
      <div>
        <WriteParameters title="填写参数" content={this.props.content.parameters} id={this.props.content.id} saveParameterValue={this.props.saveParameterValue} />
        <ExecuteInterface title="选择目标服务器" content={this.props.content} id={this.props.content.id} executeInterface={this.props.executeInterface}/>
      </div>
    );
  }
}

class ExecuteInterface extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
    console.log(props);
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        error(err);
        return;
      }
      values.id = this.props.id;
      values.singleRecordsId = this.props.content.singleRecordsId;
      this.setState({ visible: false });
      this.props.executeInterface(values);
    });

  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    const ExecuteInterfaceCreateForm = Form.create()(ExecuteInterfaceForm);
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          执行接口
      </Button>
        <ExecuteInterfaceCreateForm
          ref={this.saveFormRef}
          content={this.props}
          title={this.props.title}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>

    )
  }
}


class ExecuteInterfaceForm extends React.Component {

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const { getFieldDecorator } = this.props.form;
    const environmentInfos = (this.props.content.content.environmentInfos || []).map(column => <Option key={column.id}>{column.evnName}</Option>);
    const children = [];
    children.push(
      <Col span={25} key={0}>
        <FormItem {...formItemLayout} label={'目标服务器'}>
          {getFieldDecorator('targetServerId', {
            rules: [{ required: true, message: '请选择目标服务器!' }],
          })(
            <Select placeholder="请选择目标服务器!" notFoundContent="该系统不存在环境信息！">
              {
                environmentInfos
              }
            </Select>
          )}
        </FormItem>
      </Col>
    );

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

class WriteParametersForm extends React.Component {

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const { getFieldDecorator } = this.props.form;
    const { content } = this.props.content;
    const children = [];
    if (content != null) {
      for (let i = 0; i < content.length; i++) {
        children.push(
          <Col span={25} key={i}>
            <FormItem {...formItemLayout} label={content[i]}>
              {getFieldDecorator(content[i], {
                rules: [{ required: true, message: '请输入' + content[i] + '!' }],
              })(
                <Input placeholder={"请输入" + content[i] + "参数！"} />
              )}
            </FormItem>
          </Col>
        );
      }
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

class WriteParameters extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        error(err);
        return;
      }
      values.id = this.props.id;
      this.setState({ visible: false });
      this.props.saveParameterValue(values);
    });

  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const WriteParametersCreateForm = Form.create()(WriteParametersForm);
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          填写参数
          </Button>
        <WriteParametersCreateForm
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


export class Reader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          查看
          </Button>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          closable={false}
          okText={'确定'}
          cancelText={'退出'}
          onCancel={this.handleCancel}
        >
          {this.props.content}
        </Modal>
      </div>
    );
  }
}