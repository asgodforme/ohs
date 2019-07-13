import React from 'react';
import { connect } from 'dva';
import DataQueryForm from '../../components/DataQueryFields.js'
import DataTableFields from '../../components/DataTableFields.js'


class DataQuery extends React.Component {
    constructor(props) {
        super(props);
        this.getModuleBySysAlias = this.getModuleBySysAlias.bind(this);
        this.querySubmit = this.querySubmit.bind(this)
    }

    componentDidMount() {
        this.getModuleBySysAlias();
    }

    getModuleBySysAlias() {
        this.props.dispatch({ type: "dataQuery/getModuleBySysAlias", payload: { sysAlias: this.props.currentSysAlias } })
    }

    querySubmit(values) {
        this.props.dispatch({ type: "dataQuery/querySubmit", payload: values })
    }

    render() {
        return (

            <div>
                <DataQueryForm data={this.props.dataQuery} currentSysAlias={this.props.currentSysAlias} querySubmit={this.querySubmit}/>
                <DataTableFields/>
            </div>
        );
    }
}

export default connect(({ dataQuery }) => ({
    dataQuery,
}))(DataQuery);