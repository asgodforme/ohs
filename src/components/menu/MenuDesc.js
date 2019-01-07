import React from 'react'
import { Modal } from 'antd';

export class MenuDesc extends React.Component {
    handleOk = (e) => {
       this.props.handleOk(e);
    }
    handleCancel = (e) => {
        this.props.handleCancel(e);
    }
    render() {
        return (
            <div>
                <Modal title={this.props.currentMenuItem.parentMenuName + "功能介绍"} visible={this.props.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    okText="确定" cancelText="关闭"
                >
                    <p>{this.props.currentMenuItem.parentMenuDesc}</p>
                </Modal>
            </div>
        );
    }
}
