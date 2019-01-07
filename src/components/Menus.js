import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export const Menus = ({ menus }) => {


    if (menus.menu != null) {
        console.log("从后台查询到的菜单数据：");
        console.log(menus.menu);
    }

    var rootSubmenuKeys = (menus.menu || []).map((item) => {
        return item.id;
    });

    var state = {
        openKeys: [rootSubmenuKeys[0]]
    };

    var handleClick = (e) => {
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }

    var onOpenChange = (openKeys) => {
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

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >

                    {
                        (menus.menu || []).map((item, index) => {
                            return (<Menu.Item key={item.id}>{item.parentMenuName}</Menu.Item>);
                        })
                    }
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        theme="dark"
                        openKeys={state.openKeys}
                        onOpenChange={this.onOpenChange}
                        onClick={this.handleClick}
                        style={{ height: '100%' }}
                    >
                        {
                            (menus.menu || []).map((item, index) => {
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
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>
                        Content
                </Content>
                </Layout>
            </Layout>
        </Layout>);
}