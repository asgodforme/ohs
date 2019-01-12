import React from 'react';
import { Layout } from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const { Content} = Layout;

export class SubMenuContent extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        this.state = {
            activeKey: props.panes[0].key,
            panes: props.panes,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { panes } = this.state;
        if (panes.find(key => key.key === nextProps.activeKey) == null) {
            panes.push(nextProps.panes[0]);
            this.setState({activeKey: nextProps.activeKey,
                panes,
            })
        } else {
            this.setState({activeKey: nextProps.activeKey,});
        }
        
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        let index;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
                index = i;
            } 
        });
        this.state.panes.splice(index, 1);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = this.state.panes[lastIndex].key;
        }
        this.setState({ activeKey });
    }
    render() {
        return (
            <div>
                <Content style={{ background: '#fff', padding: 24, margin: '24px 0', minHeight: 800 }}>
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                        hideAdd={true}
                    >
                        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            <h1>{pane.content}</h1>
                            {pane.component}
                        </TabPane>)}
                    </Tabs>
                </Content>
            </div>
        );
    }
}