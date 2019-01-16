import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { error } from '../SysCfgQueryFieldAlert';
const FormItem = Form.Item;
const Option = Select.Option;


var provinceData = [];
var cityData = {};
class addCreateForm extends React.Component {
  constructor(props) {
    super();
    for (let i = 0; i < props.allSys.length; i++) {
      provinceData.push(props.allSys[i].sysAlias);
      let cityDatas = [];
      for (let j = 0; j < props.allSys[i].ohsTableConfigs.length; j++) {
        cityDatas.push(props.allSys[i].ohsTableConfigs[j].tableName);
      }
      cityData[props.allSys[i].sysAlias] = cityDatas;
    }
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    }
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
  }

  // componentDidMount() {
  //   console.log('jiangjie')
  //   for (let i = 0; i < this.props.allSys.length; i++) {
  //     provinceData.push(this.props.allSys[i].sysAlias);
  //     let cityDatas = [];
  //     for (let j = 0; j < this.props.allSys[i].ohsTableConfigs.length; j++) {
  //       cityDatas.push(this.props.allSys[i].ohsTableConfigs[j].tableName);
  //     }
  //     cityData[this.props.allSys[i].sysAlias] = cityDatas;
  //   }
  //   this.setState({
  //     cities: cityData[provinceData[0]],
  //     secondCity: cityData[provinceData[0]][0],
  //   })
  //   console.log(this.state)

  //   console.log(provinceData);
  //   console.log(cityData);
  //   console.log(this.state)
  // }

  handleProvinceChange = (value) => {
    const { form, queryFields, allSys } = this.props;
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
    if (queryFields.fieldNames.indexOf('tableName') > -1) {
      fieldsValues.tableName = '';
    }

    form.setFieldsValue(fieldsValues);
    this.setState(Object.assign({}, this.state, {
      cities: cityData[value],
      secondCity: cityData[value][0],
    }));
  }
  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }

  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);

    const { visible, onCancel, onCreate, form, queryFields, allSys } = this.props;
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
                  provinceOptions
                }
              </Select>
            )}
          </FormItem>
        )
      } else if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames[i] === 'tableName') {
        formItem.push(
          <FormItem key={i} label={queryFields.fieldDescs[i]}>
            {getFieldDecorator(queryFields.fieldNames[i], {
              rules: [{ required: true, message: '请输入' + queryFields.fieldDescs[i] + '!' }],
              onChange: this.onSecondCityChange,
            })(
              <Select placeholder="请选择表名">
                {
                  cityOptions
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
              <Input disabled={(queryFields.fieldNames[i] === 'sysChineseNme' || queryFields.fieldNames[i] === 'schemaName') ? true : false} />
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
const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, queryFields, allSys } = props;
    const { getFieldDecorator } = form;
    var handleSelectChange = (value) => {
      console.log(allSys);
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

      form.setFieldsValue(fieldsValues);
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
      } else if (queryFields.dataName === 'columnConfig' && queryFields.fieldNames[i] === 'tableName') {
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
              <Input disabled={(queryFields.fieldNames[i] === 'sysChineseNme' || queryFields.fieldNames[i] === 'schemaName') ? true : false} />
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
