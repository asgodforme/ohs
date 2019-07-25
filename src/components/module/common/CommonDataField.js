import React from 'react';
import { Table, Button, Modal } from 'antd';
import { CommonUpdateField } from './CommonUpdateField';

export function CommonDataField(props) {
  let columns;
  if (props.columns != null) {
    const operation = props.queryFields.isExeButton === 'Y' ?
      ((text, record) => (<span><ExeButton /></span>)) : ((text, record) => (
        <span>
          <CommonUpdateField onDelete={props.onDelete} records={record} onUpdate={props.onUpdate}
            queryFields={props.queryFields} allSys={props.data.allSys} deleteRecordsById={props.deleteRecordsById}
            save={props.save} saveTestsuitRecords={props.saveTestsuitRecords}
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
          sysConfig.responseTemplate = <Reader title="请求报文模板" content={sysConfig.responseTemplate} />;
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button type="primary">
          填写参数
        </Button>
        &nbsp;&nbsp;
        <Button type="primary">
          执行接口
        </Button>
      </div>
    );
  }


}


class Reader extends React.Component {

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