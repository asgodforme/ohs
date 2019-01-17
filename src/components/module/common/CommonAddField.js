import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { error } from '../SysCfgQueryFieldAlert';
const FormItem = Form.Item;
const Option = Select.Option;

let sysInfos = [];
let sysTableInfos = {};
let sysTableColumnInfos = {};
let sysTableColumnChnInfos = {};
class addCreateForm extends React.Component {
  constructor(props) {
    super();
    console.log(props.allSys);
    for (let i = 0; i < props.allSys.length; i++) {
      if (sysInfos.indexOf(props.allSys[i].sysAlias) <= -1) {
        sysInfos.push(props.allSys[i].sysAlias);
      }
      if (props.allSys[i].ohsTableConfigs != null) {
        let sysTableInfoss = [];
        for (let j = 0; j < props.allSys[i].ohsTableConfigs.length; j++) {
          sysTableInfoss.push(props.allSys[i].ohsTableConfigs[j].tableName);
          // 遍历columns
          let sysTableColumnInfo = [];
          let sysTableColumnChnInfo = [];
          if (props.allSys[i].ohsTableConfigs[j].columns != null) {
            for (let k = 0; k < props.allSys[i].ohsTableConfigs[j].columns.length; k++) {
              sysTableColumnInfo.push(props.allSys[i].ohsTableConfigs[j].columns[k].columnName);
              sysTableColumnChnInfo[props.allSys[i].ohsTableConfigs[j].columns[k].columnName] = props.allSys[i].ohsTableConfigs[j].columns[k].columnAlias;
            }
          }
          sysTableColumnInfos[props.allSys[i].ohsTableConfigs[j].tableName] = sysTableColumnInfo;
          sysTableColumnChnInfos[props.allSys[i].ohsTableConfigs[j].tableName] = sysTableColumnChnInfo;
        }
        sysTableInfos[props.allSys[i].sysAlias] = sysTableInfoss;
      }
    }

    this.state = {
      tables: [],
      secondCity: '',
    }
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
  }

  handleProvinceChange = (value) => {
    console.log(sysTableColumnInfos);
    console.log(sysTableColumnChnInfos);
    const { form, queryFields, allSys } = this.props;
    if ((queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig')
      && (sysTableInfos[value] == null || (sysTableInfos[value] != null && sysTableInfos[value][0] == null))) {
      error(value + "系统下不存在表信息，请在“表配置”中先添加对应系统的表信息！");
      return;
    }
    let sysChineseNme;
    let schemaName;
    for (let i = 0; i < allSys.length; i++) {
      if (allSys[i].sysAlias === value) {
        sysChineseNme = allSys[i].sysChineseNme;
        schemaName = allSys[i].schemaName;
        break;
      }
    }

    let fieldsValues = {};
    if (queryFields.fieldNames.indexOf('sysChineseNme') > -1) {
      fieldsValues.sysChineseNme = sysChineseNme;
    }
    if (queryFields.fieldNames.indexOf('schemaName') > -1) {
      fieldsValues.schemaName = schemaName;
    }
    if ((sysTableInfos[value] != null && sysTableInfos[value][0] != null)
      && (queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig')
      && queryFields.fieldNames.indexOf('tableName') > -1) {
      // fieldsValues.tableName = sysTableInfos[value][0];
    }

    form.setFieldsValue(fieldsValues);
    this.setState(Object.assign({}, this.state, {
      tables: sysTableInfos[value],
    }));
  }
  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
    console.log(sysTableColumnInfos);
    console.log(sysTableColumnChnInfos);
    const { form, queryFields, allSys } = this.props;
    if (queryFields.dataName === 'enumValueConfig'
      && (sysTableColumnInfos[value] == null || (sysTableColumnInfos[value] != null && sysTableColumnInfos[value][0] == null))) {
      error(value + "该表下不存在字段信息，请在“字段配置”中先添加对应表的字段信息！");
      return;
    }
    this.setState(Object.assign({}, this.state, {
      columns: sysTableColumnInfos[value],
      columnsChns: sysTableColumnChnInfos[value],
    }));
  }


  onColumnAliasChange = (value) => {
    const { form, queryFields } = this.props;
    let fieldsValues = {};
    if (queryFields.dataName === 'enumValueConfig' && queryFields.fieldNames.indexOf('columnAlias') > -1) {
      fieldsValues.columnAlias = this.state.columnsChns[value];
    }
    form.setFieldsValue(fieldsValues);
  }

  render() {
    const sysOptions = sysInfos.map(sys => <Option key={sys}>{sys}</Option>);
    const tableOptions = (this.state.tables || []).map(table => <Option key={table}>{table}</Option>);
    const columnOptions = (this.state.columns || []).map(column => <Option key={column}>{column}</Option>);
    const { visible, onCancel, onCreate, form, queryFields } = this.props;
    const { getFieldDecorator } = form;

    const formItem = [];
    for (let i = 0; i < queryFields.fieldNames.length; i++) {
      if (queryFields.fieldNames[i] === 'sysAlias') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: this.handleProvinceChange,
            })(
              <Select placeholder="请选择系统码">
                {
                  sysOptions
                }
              </Select>
            )}
          </FormItem>
        )
      } else if ((queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig')
        && queryFields.fieldNames[i] === 'tableName') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: this.onSecondCityChange,
            })(
              <Select placeholder="请选择表名" notFoundContent="当前系统下不存在表信息，请在“表配置”中先添加对应系统的表信息！">
                {
                  tableOptions
                }
              </Select>
            )}
          </FormItem>
        )
      } else if (queryFields.dataName === 'enumValueConfig' && queryFields.fieldNames[i] === 'columnName') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: this.onColumnAliasChange
            })(
              <Select placeholder="请选择字段名" notFoundContent="该表下不存在字段信息，请在“字段配置”中先添加对应表的字段信息！">
                {
                  columnOptions
                }
              </Select>
            )}
          </FormItem>)
      } else {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
            })(
              <Input disabled={
                (
                  queryFields.fieldNames[i] === 'sysChineseNme' || queryFields.fieldNames[i] === 'schemaName'
                || (queryFields.fieldNames[i] === 'columnAlias' && queryFields.dataName === 'enumValueConfig')  
                ) 
                ? true : false} 
              />
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
}

const CollectionCreateForm1 = Form.create()(addCreateForm);

export class CommonAddField extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    if (this.props.data.allSys.length === 0) {
      this.props.getAllSys();
      error("系统中不存在系统配置信息，请先添加系统配置信息");
      return;
    }
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
        <CollectionCreateForm1
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
