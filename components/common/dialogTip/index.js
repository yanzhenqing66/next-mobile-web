import { Dialog } from 'antd-mobile'

function DialogTip({ visible, title, content, onClose, actions, actionOpt }) {
  return (
    <Dialog
      visible={visible}
      // getContainer={document.querySelector('#__next')}
      title={title}
      content={content}
      closeOnAction
      onClose={onClose}
      actions={actions}
      onAction={(action) => actionOpt(action)}
    />
  )
}

export default DialogTip