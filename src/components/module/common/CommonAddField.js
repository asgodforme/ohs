import React from 'react';
import { Button, Modal, Form, Input, Select, Radio } from 'antd';
import { error } from '../SysCfgQueryFieldAlert';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class addCreateForm extends React.Component {
  constructor(props) {
    super();
    let sysInfos = [];
    let sysTableInfos = {};
    let sysTableChnInfos = {};
    let moduleInfos = {};
    let moduleChnInfos = {};
    let sysTableColumnInfos = {};
    let sysTableColumnChnInfos = {};
    for (let i = 0; i < props.allSys.length; i++) {
      if (sysInfos.indexOf(props.allSys[i].sysAlias) <= -1) {
        sysInfos.push(props.allSys[i].sysAlias);
      }

      if (props.allSys[i].ohsModuleConfigs != null) {
        let moduleInfo = [];
        let moduleChnInfo = [];
        for (let j = 0; j < props.allSys[i].ohsModuleConfigs.length; j++) {
          moduleInfo.push(props.allSys[i].ohsModuleConfigs[j].moduleAlias);
          moduleChnInfo[props.allSys[i].ohsModuleConfigs[j].moduleAlias] = props.allSys[i].ohsModuleConfigs[j].moduleName;
        }
        moduleInfos[props.allSys[i].sysAlias] = moduleInfo;
        moduleChnInfos[props.allSys[i].sysAlias] = moduleChnInfo;
      }

      if (props.allSys[i].ohsTableConfigs != null) {
        let sysTableInfoss = [];
        let sysTableChnInfo = {};
        if (props.allSys[i].ohsTableConfigs != null) {
          for (let j = 0; j < props.allSys[i].ohsTableConfigs.length; j++) {
            sysTableInfoss.push(props.allSys[i].ohsTableConfigs[j].tableName);
            sysTableChnInfo[props.allSys[i].ohsTableConfigs[j].tableName] = props.allSys[i].ohsTableConfigs[j].tableChnName;
            if (props.allSys[i].ohsTableConfigs[j].columns != null) {
              // 遍历columns
              let sysTableColumnInfo = [];
              let sysTableColumnChnInfo = [];
              for (let k = 0; k < props.allSys[i].ohsTableConfigs[j].columns.length; k++) {
                if (sysTableColumnInfo.indexOf(props.allSys[i].ohsTableConfigs[j].columns[k].columnName) === -1) {
                  sysTableColumnInfo.push(props.allSys[i].ohsTableConfigs[j].columns[k].columnName);
                }
                sysTableColumnChnInfo[props.allSys[i].ohsTableConfigs[j].columns[k].columnName] = props.allSys[i].ohsTableConfigs[j].columns[k].columnAlias;
              }
              sysTableColumnInfos[props.allSys[i].ohsTableConfigs[j].tableName] = sysTableColumnInfo;
              sysTableColumnChnInfos[props.allSys[i].ohsTableConfigs[j].tableName] = sysTableColumnChnInfo;
            }
          }
          sysTableInfos[props.allSys[i].sysAlias] = sysTableInfoss;
          sysTableChnInfos[props.allSys[i].sysAlias] = sysTableChnInfo;
        }
      }
    }
    this.state = {
      tables: [],
      secondCity: '',
      sysInfos: sysInfos,
      sysTableInfos: sysTableInfos,
      sysTableChnInfos: sysTableChnInfos,
      moduleInfos: moduleInfos,
      moduleChnInfos: moduleChnInfos,
      sysTableColumnInfos: sysTableColumnInfos,
      sysTableColumnChnInfos: sysTableColumnChnInfos,
    }
    this.handleSysAlias = this.handleSysAlias.bind(this);
  }

  handleSysAlias = (value) => {
    let sysTableInfos = this.state.sysTableInfos;
    let moduleInfos = this.state.moduleInfos;
    let sysTableChnInfos = this.state.sysTableChnInfos;
    let moduleChnInfos = this.state.moduleChnInfos;
    const { form, queryFields, allSys } = this.props;
    if ((queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig' || queryFields.dataName === 'singleSqlConfig')
      && (sysTableInfos[value] == null || (sysTableInfos[value] != null && sysTableInfos[value][0] == null))) {
      error(value + "系统下不存在表信息，请在“数据定制化配置-表配置”中先添加对应系统的表信息！");
      return;
    }
    if ((queryFields.dataName === 'singleSqlConfig') && moduleInfos[value].length === 0) {
      error(value + "系统下不存在模块信息，请在“公共参数配置-模块配置”中先添加对应系统的模块信息！");
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
      tableChns: sysTableChnInfos[value],
      modules: moduleInfos[value],
      moduleChns: moduleChnInfos[value],
    }));
  }
  onSecondCityChange = (value) => {
    let sysTableColumnInfos = this.state.sysTableColumnInfos;
    let sysTableColumnChnInfos = this.state.sysTableColumnChnInfos;
    this.setState({
      secondCity: value,
    });
    const { form, queryFields } = this.props;
    if (queryFields.dataName === 'enumValueConfig'
      && (sysTableColumnInfos[value] == null || (sysTableColumnInfos[value] != null && sysTableColumnInfos[value][0] == null))) {
      error(value + "该表下不存在字段信息，请在“字段配置”中先添加对应表的字段信息！");
      return;
    }
    let fieldsValues = {};
    if ((queryFields.dataName === 'singleSqlConfig' || queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig')
      && queryFields.fieldNames.indexOf('tableChnName') > -1) {
      fieldsValues.tableChnName = this.state.tableChns[value];
    }
    form.setFieldsValue(fieldsValues);
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
    } else if (queryFields.dataName === 'singleSqlConfig' && queryFields.fieldNames.indexOf('columnAlias') > -1) {
      fieldsValues.columnName = this.state.columnsChns[value];
    }
    form.setFieldsValue(fieldsValues);
  }

  onIsHideChange = (e) => {
    const { form, queryFields } = this.props;
    let fieldsValues = {};
    if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames.indexOf('isHide') > -1) {
      fieldsValues.isHide = e.target.value;
    }
    form.setFieldsValue(fieldsValues);
  }

  onModuleAliasChange = (value) => {
    const { form, queryFields } = this.props;
    let fieldsValues = {};
    if ((queryFields.dataName === 'singleSqlConfig' 
    || queryFields.dataName === 'interfaceConfig'
    || queryFields.dataName === 'testsuitConfig') 
    && queryFields.fieldNames.indexOf('moduleAlias') > -1) {
      fieldsValues.moduleName = this.state.moduleChns[value];
    }
    form.setFieldsValue(fieldsValues);
  }

  render() {
    const sysOptions = this.state.sysInfos.map(sys => <Option key={sys}>{sys}</Option>);
    const tableOptions = (this.state.tables || []).map(table => <Option key={table}>{table}</Option>);
    const columnOptions = (this.state.columns || []).map(column => <Option key={column}>{column}</Option>);
    const moduleOptions = (this.state.modules || []).map(modle => <Option key={modle}>{modle}</Option>)
    const { visible, onCancel, onCreate, form, queryFields } = this.props;
    const { getFieldDecorator } = form;

    const formItem = [];
    for (let i = 0; i < queryFields.fieldNames.length; i++) {
      if (queryFields.fieldNames[i] === 'sysAlias') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: this.handleSysAlias,
            })(
              <Select placeholder="请选择系统码">
                {
                  sysOptions
                }
              </Select>
            )}
          </FormItem>
        )
      } else if ((queryFields.dataName === 'columnConfig' || queryFields.dataName === 'enumValueConfig' || queryFields.dataName === 'singleSqlConfig')
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
      } else if (queryFields.dataName === 'singleSqlConfig' && queryFields.fieldNames[i] === 'columnAlias') {
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
      } else if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames[i] === 'isHide') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: this.onIsHideChange
            })(
              <RadioGroup>
                <Radio value={"1"}>{'是'}</Radio>
                <Radio value={"0"}>{'否'}</Radio>
              </RadioGroup>
            )}
          </FormItem>)
      } else if ((queryFields.dataName === 'singleSqlConfig' 
      || queryFields.dataName === 'interfaceConfig'
      || queryFields.dataName === 'testsuitConfig') 
      && queryFields.fieldNames[i] === 'moduleAlias') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: this.onModuleAliasChange
            })(
              <Select placeholder="请选择模块码" notFoundContent="该表下不存在模块信息，请在“模块配置”中先添加对应系统的模块信息！">
                {
                  moduleOptions
                }
              </Select>
            )}
          </FormItem>)
      } else if (queryFields.dataName === 'singleSqlConfig' && queryFields.fieldNames[i] === 'remark') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i] + '(新增时，如果不存在新增表的单表SQL，则此备注有效，否则无效)'}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '新增时，如果不存在新增表的单表SQL，则此备注有效，否则无效' }],
            })(
              <Input />
            )}
          </FormItem>)
      } else if (queryFields.dataName === 'singleSqlConfig' && queryFields.fieldNames[i] === 'singleTableSql') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              initialValue: '点击确认后，会根据字段配置信息，生成对应的单表查询语句。'
            })(
              <Input disabled={true} />
            )}
          </FormItem>)
      } else if (queryFields.dataName === 'evnConfig' && queryFields.fieldNames[i] === 'evnTyp') {
        formItem.push(
            <FormItem key={i} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i], {
                rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
                initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
              })(
                <RadioGroup>
                  <Radio value={"1"}>{'数据库'}</Radio>
                  <Radio value={"0"}>{'应用服务器'}</Radio>
                </RadioGroup>
              )}
            </FormItem>);
      } else if (queryFields.dataName === 'evnConfig' && queryFields.fieldNames[i] === 'dbType') {
        formItem.push(
            <FormItem key={i} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i], {
                rules: [{ required: true, message: '请选择' + queryFields.fieldDescs[i] + '!' }],
                initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
              })(
                <Select>
                  <Option value={"0"}>{'MYSQL'}</Option>
                  <Option value={"1"}>{'ORACLE'}</Option>
                  <Option value={"2"}>{'DB2'}</Option>
                </Select>
              )}
            </FormItem>);
      } else if (queryFields.dataName === 'interfaceConfig' && queryFields.fieldNames[i] === 'method') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请选择' + queryFields.fieldDescs[i] + '!' }],
              initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
            })(
              <Select>
                <Option value={"POST"}>{'POST'}</Option>
                <Option value={"GET"}>{'GET'}</Option>
                <Option value={"PUT"}>{'PUT'}</Option>
                <Option value={"DELETE"}>{'DELETE'}</Option>
              </Select>
            )}
          </FormItem>);
      } else if (queryFields.dataName === 'interfaceConfig' && queryFields.fieldNames[i] === 'interfaceType') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请选择' + queryFields.fieldDescs[i] + '!' }],
              initialValue: this.state.queryParm ? this.state.queryParm[queryFields.fieldNames[i]] : null,
            })(
              <Select>
                <Option value={"WEBSERVICE"}>{'WEBSERVICE'}</Option>
                <Option value={"RESETFUL"}>{'RESETFUL'}</Option>
              </Select>
            )}
          </FormItem>);
      } else {
        if (queryFields.fieldNames[i] !== 'requestTemplate' && queryFields.fieldNames[i] !== 'responseTemplate') {
          formItem.push(
            <FormItem key={i} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i], {
                rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              })(
                <Input disabled={
                  (
                    queryFields.fieldNames[i] === 'sysChineseNme' || queryFields.fieldNames[i] === 'schemaName'
                    || (queryFields.fieldNames[i] === 'tableChnName' && queryFields.dataName === 'singleSqlConfig')
                    || (queryFields.fieldNames[i] === 'tableChnName' && queryFields.dataName === 'columnConfig')
                    || (queryFields.fieldNames[i] === 'tableChnName' && queryFields.dataName === 'enumValueConfig')
                    || (queryFields.fieldNames[i] === 'moduleName' && queryFields.dataName === 'singleSqlConfig')
                    || (queryFields.fieldNames[i] === 'moduleName' && queryFields.dataName === 'interfaceConfig')
                    || (queryFields.fieldNames[i] === 'moduleName' && queryFields.dataName === 'testsuitConfig')
                    || (queryFields.fieldNames[i] === 'columnName' && queryFields.dataName === 'singleSqlConfig')
                    || (queryFields.fieldNames[i] === 'columnAlias' && queryFields.dataName === 'enumValueConfig')
                  )
                    ? true : false}
                />
              )}
            </FormItem>
          )
        } else {
          formItem.push(
            <FormItem key={i} label={queryFields.fieldDescs[i]}>
              {getFieldDecorator(queryFields.fieldNames[i], {
                rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              })(
                <Input.TextArea rows= {25}/>
              )}
            </FormItem>
          )

        }
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
            formItem
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
    const form = this.form;
    form.resetFields();
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
