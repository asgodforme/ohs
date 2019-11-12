import React from 'react';
import SystemConfig from '../../routes/module/SystemConfig'
import { Layout, Menu, Icon, Tag } from 'antd';
import { MenuDesc } from './MenuDesc'
import { SubMenuContent } from './SubMenuContent'
import ModuleConfig from '../../routes/module/ModuleConfig';
import UserConfig from '../../routes/module/UserConfig';
import EvnConfig from '../../routes/module/EvnConfig';
import TableConfig from '../../routes/module/data/TableConfig';
import ColumnConfig from '../../routes/module/data/ColumnConfig';
import EnumValueConfig from '../../routes/module/data/EnumValueConfig';
import SingleSqlConfig from '../../routes/module/data/SingleSqlConfig';
import DataQuery from '../../routes/dataQuery/DataQuery';
import InterfaceConfig from '../../routes/module/InterfaceConfig';
import TestsuitConfig from '../../routes/module/TestsuitConfig';
import InterfaceTest from '../../routes/module/InterfaceTest';
import TestsuitTest from '../../routes/module/TestsuitTest';
import { LoginModel} from '../../components/LoginModel';

const { SubMenu } = Menu;
const { Header, Sider, Footer } = Layout;

const componentMapping = {
    systemConfig: <SystemConfig />,
    moduleConfig: <ModuleConfig />,
    userConfig: <UserConfig />,
    evnConfig: <EvnConfig />,
    tableConfig: <TableConfig />,
    columnConfig: <ColumnConfig />,
    enumValueConfig: <EnumValueConfig />,
    singleSqlConfig: <SingleSqlConfig />,
    interfaceConfig: <InterfaceConfig />,
    testsuitConfig: <TestsuitConfig />,
    dataQuery: "dataQuery",
    interfaceTest: <InterfaceTest />,
    testsuitTest: <TestsuitTest/>,
};

export class Menus extends React.Component {

    constructor(props) {
        super();
        this.state = {
            current: '1',
            openKeys: ['1'],
            menuItemDescVisible: false,
            currentMenuItem: { key: 1 },
            activeKey: 0,
            panes: [
                { title: '首页', content: '欢迎使用在线辅助系统', key: '0', closable: false },
            ],
            user: null,
        }

    }

    handleClick = (e) => {
        let currentSubItem;
        exit: for (let i = 0; i < this.props.menus.menu.length; i++) {
            let subElm = this.props.menus.menu[i].subMenus;
            for (let j = 0; j < subElm.length; j++) {
                if (e.key === subElm[j].id && !this.state.panes.find(key => subElm[j].id === key.key)) {
                    currentSubItem = { ...subElm[j], parentMenuName: this.props.menus.menu[i].parentMenuName };
                    break exit;
                }
            }
        }
        if (currentSubItem != null && typeof(componentMapping[currentSubItem.subMenuUrl]) !== 'string') {
            this.setState({
                activeKey: currentSubItem.id,
                panes: [{ title: currentSubItem.subMenuName, content: currentSubItem.subMenuName, key: currentSubItem.id, component: componentMapping[currentSubItem.subMenuUrl] }]
            });
        } else if (currentSubItem != null && componentMapping[currentSubItem.subMenuUrl] === 'dataQuery') {
            this.setState({
                activeKey: currentSubItem.id,
                panes: [{ title: currentSubItem.subMenuName, content: currentSubItem.subMenuName, key: currentSubItem.id, component: <DataQuery currentSysAlias={currentSubItem.subMenuName}/>}]
            });
        }

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

    UNSAFE_componentWillReceiveProps(nextProps) {
       this.setState({user: nextProps.menus.user});
        
    }

    render() {
        return (
            <Layout>
                <Tag color="#f50">欢迎你！ {this.state.user}</Tag>
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
                                return (<Menu.Item key={item.id}>{item.parentMenuName + "介绍"}</Menu.Item>);
                            })
                        } 
                    </Menu>
                </Header>
                <MenuDesc visible={this.state.menuItemDescVisible} currentMenuItem={this.state.currentMenuItem} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                <LoginModel title={'登录'} user={this.state.user} saveUserConfig={this.props.saveUserConfig}/>
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
                    <Layout style={{ padding: '0 24px 0px' }}>
                        {<SubMenuContent panes={this.state.panes} activeKey={this.state.activeKey + ''} />}
                        <Footer style={{ textAlign: 'center' }}>
                            Online Help System ©2019 Created by JiangJie
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>);
    }
}