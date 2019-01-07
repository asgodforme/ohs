import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { MenuDesc } from './MenuDesc'
import {SubMenuContent} from './SubMenuContent'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export class Menus extends React.Component {

    constructor(props) {
        super();
        this.state = {
            current: '1',
            openKeys: ['1'],
            menuItemDescVisible: false,
            currentMenuItem: { key: 1 },
            currentSubItem: { key: 1, parentMenuName: '首页', subMenuName: '在线辅助系统'},

        }
    }

    handleClick = (e) => {
        let currentSubItem;
        exit: for (let i = 0; i < this.props.menus.menu.length; i++) {
            let subElm = this.props.menus.menu[i].subMenus;
            for (let j = 0; j <subElm.length; j++) {
                if (e.key === subElm[j].id) {
                    currentSubItem = {...subElm[j], parentMenuName: this.props.menus.menu[i].parentMenuName};
                    break exit;
                }
            }
        }
       
        this.setState({ current: e.key, currentSubItem: currentSubItem, });
        console.log(this.state)
    }

    handleDesc = (e) => {
        let currentItem = this.props.menus.menu.find(key => e.key === key.id);
        this.setState({ menuItemDescVisible: true, currentMenuItem: currentItem, });
    }

    handleOk = (e) => {
        this.setState({ menuItemDescVisible: false });
    }

    handleCancel = (e) => {
        this.setState({ menuItemDescVisible: false });
    }


    onOpenChange = (openKeys) => {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }

    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }

    render() {

        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        onClick={this.handleDesc}
                        style={{ lineHeight: '64px' }}
                    >
                        {
                            (this.props.menus.menu || []).map((item, index) => {
                                return (<Menu.Item key={item.id}>{item.parentMenuName}</Menu.Item>);
                            })
                        }
                    </Menu>
                </Header>
                <MenuDesc visible={this.state.menuItemDescVisible} currentMenuItem={this.state.currentMenuItem} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            theme="dark"
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                            onClick={this.handleClick}
                            style={{ height: '100%' }}
                        >
                            {
                                (this.props.menus.menu || []).map((item, index) => {
                                    return (
                                        <SubMenu key={item.id} title={<span><Icon type="setting" />{item.parentMenuName}</span>}>
                                            {(item.subMenus || []).map((subItem, subIndex) => {
                                                return <Menu.Item key={subItem.id}>{subItem.subMenuName}</Menu.Item>
                                            })}
                                        </SubMenu>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <SubMenuContent currentSubItem={this.state.currentSubItem}/>
                    </Layout>
                </Layout>
            </Layout>);
    }
}