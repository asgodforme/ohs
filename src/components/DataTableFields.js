import React from 'react';
import { Table } from 'antd';

class DataTableFields extends React.Component {

    constructor(props) {
        super(props);
        const columns = [];
        const datas = [];
        const titles = [];
        if (props.data.querySubmitData != null) {
            const querySubmitData = props.data.querySubmitData;
            for (var i = 0; i < querySubmitData.length; i++) {
                const dataFields = querySubmitData[i].dataFields;
                const dataHeader = querySubmitData[i].dataHeader;
                titles.push(querySubmitData[i].title);
                const column = [];
                columns.push(column);
                if (dataHeader != null) {
                    dataHeader.map((value, key) => {
                        for (var j in value) {
                            column.push({
                                title: value[j],
                                dataIndex: j,
                            });
                        }
                        return null;
                    });
                }

                const data = [];
                datas.push(data);
                if (dataFields != null) {
                    dataFields.map((value, key) => {
                        let dat = { key };
                        for (var j in value) {
                            dat[j] = value[j];
                        }
                        data.push(dat);
                        return null;
                    })
                }
            }

        }

        this.state = {
            columns: columns,
            datas: datas,
            titles: titles,
        }
    }

    render() {

        let tables;
        if (this.state.columns.length > 0) {
            tables = this.state.columns.map((value, key) => {
                return (
                    <Table key={key}
                        columns={value}
                        dataSource={this.state.datas[key]}
                        bordered
                        title={() => this.state.titles[key]}
                    />
                )
            })
        }
        return (
            <div>{tables}</div>
        )
    }
}

export default DataTableFields;