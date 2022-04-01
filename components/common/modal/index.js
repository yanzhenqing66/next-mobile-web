import React from 'react'
import { Popup } from 'antd-mobile'

function Modal({ visible, children, onClose, styles, destroyOnClose, bodyStyles }) {
  return (
    <Popup
      visible={visible}
      getContainer={document.getElementById('__next')}
      onClose={onClose}
      onMaskClick={onClose}
      bodyStyle={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 550,
        ...bodyStyles
      }}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        width: document.getElementById('__next').offsetWidth,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999,
        ...styles
      }}
      destroyOnClose={destroyOnClose}
    >
      {children}
    </Popup>
  )
}

export default Modal