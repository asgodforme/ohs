import { Modal } from 'antd';

export function info(content) {
  Modal.info({
    title: '正常提示',
    content: content,
    onOk() {},
  });
}

export function success(content) {
  Modal.success({
    title: '成功提示',
    content: content,
  });
}

export function error(content) {
  Modal.error({
    title: '错误提示',
    content: content,
  });
}

export function warning(content) {
  Modal.warning({
    title: '警告',
    content: content,
  });
}
