import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { error } from '../SysCfgQueryFieldAlert';
const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, queryFields, allSys } = props;
    const { getFieldDecorator } = form;
    var handleSelectChange = (value) => {
      let sysChineseNme;
      for (let i = 0; i < allSys.length; i++) {
        if (allSys[i].sysAlias === value) {
          sysChineseNme = allSys[i].sysChineseNme;
          break;
        }
      }
      form.setFieldsValue({
        sysChineseNme: sysChineseNme,
      });
    }
    const formItem = [];
    for (let i = 0; i < queryFields.fieldNames.length; i++) {
      if (queryFields.fieldNames[i] === 'sysAlias') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: handleSelectChange,
            })(
              <Select placeholder="请选择系统码">
                {
                  allSys.map(item => {
                    return <Option key={item.id} value={item.sysAlias}>{item.sysAlias}</Option>
                  })
                }
              </Select>
            )}
          </FormItem>
        )
      } else {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
            })(
              <Input disabled={queryFields.fieldNames[i]==='sysChineseNme'? true : false}/>
            )}
          </FormItem>
        )
      }
    }
    return (
      <Modal
        visible={visible}
        title={queryFields.addTitle}
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
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
);

export class CommonAddField extends React.Component {
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
      this.props.save(values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>新增</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          queryFields={this.props.queryFields}
          allSys={this.props.data.allSys}
        />
      </div>
    );
  }
}
