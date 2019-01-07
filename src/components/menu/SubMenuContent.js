import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

export class SubMenuContent extends React.Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>{this.props.currentSubItem.parentMenuName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.currentSubItem.subMenuName}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>
                    <h1>欢迎使用{this.props.currentSubItem.subMenuName}</h1>
                </Content>
            </div>
        )
    }
}