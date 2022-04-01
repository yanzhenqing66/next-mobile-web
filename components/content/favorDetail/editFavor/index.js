import React, { useState, memo } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Button, Input, List, Switch, TextArea } from 'antd-mobile'
import { DeleteOutline } from 'antd-mobile-icons'
import {MenuOutlined} from '@ant-design/icons'
const ModalComp = dynamic(import('@/components/common/modal'), { ssr: false })
import DialogTip from '@/components/common/dialogTip'
import { updFavorCard, delFavorCard } from '@/api/wishList'
import EventBus from '@/utils/eventBus'
import { throttle } from '@/utils/optimizeFn'
import IconFont from '@/components/common/IconFont'


function EditFavor({ id, editVisible, close, foldInfo }) {
  const router = useRouter()
  const [tipVis, setTipVis] = useState(false)
  const [favorParams, setFavorParams] = useState({
    isShow: foldInfo.isShow ? true : false,
    name: foldInfo.name || '',
    folderDesc: foldInfo.folderDesc || '',
    id
  })
  const [load, setLoad] = useState(false)

  const nameChange = (name) => {
    setFavorParams({ ...favorParams, name })
  }

  const descChange = (folderDesc) => {
    setFavorParams({ ...favorParams, folderDesc })
  }

  //  Save
  const updFavor = throttle(() => {
    if (!favorParams.name) return
    setLoad(true)
    favorParams.isShow = favorParams.isShow ? 1 : 0
    const params = JSON.parse(JSON.stringify(favorParams))
    updFavorCard(params).then(res => {
      if (res.code === 200) {
        EventBus.emit('SaveFold')
        setLoad(false)
        close()
      }
    })
  })

  // Delete
  const delFold = throttle(() => {
    delFavorCard({ id })
      .then(res => {
        if (res.code === 200) {
          close()
          router.replace('/wishList')
        }
      })
  })

  const actionOpt = action => {
    if (action.key == 1) {
      delFold()
    }
  }

  const makeSwitch = (
    <Switch
      checked={favorParams.isShow}
      onChange={checked => {
        setFavorParams({ ...favorParams, isShow: checked })
      }}
      style={{ '--checked-color': '#222' }}
    />
  )

  const lockShow = (
    favorParams.isShow ? 'icon-lock' : 'icon-unlock'
  )

  return (
    <>
      <ModalComp
        visible={editVisible}
        onClose={() => close()}
      >
        <List
          style={{
            '--prefix-width': '5em',
          }}
        >
          <List.Item title="List name" prefix={<MenuOutlined />}>
            <Input 
              value={favorParams.name} 
              clearable 
              onChange={nameChange} 
            />
          </List.Item>
          <List.Item title="Description" prefix={<IconFont type="icon-edit" />}>
            <TextArea 
              placeholder='Add what your list’s about' 
              onChange={descChange}
              autoSize
              rows={1}
              value={favorParams.folderDesc}
              style={{maxHeight: 120, overflow: 'auto'}}
            />
          </List.Item>
          <List.Item prefix={<IconFont type={lockShow} />} extra={makeSwitch}>
            Make this list private
          </List.Item>
          <List.Item
            prefix={<DeleteOutline />}
            style={{ color: '#D43131' }}
            onClick={() => setTipVis(true)}
            arrow={false}
          >
            Deleted this list
          </List.Item>
          <List.Item>
            <Button 
              style={{
                width: '4.4rem',
                height: '0.5rem',
                backgroundColor: '#222',
                borderRadius: 100,
                color: '#fff',
                fontSize: '0.18rem',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)'
              }} 
              onClick={updFavor}
              loading={load}
            >Save</Button>
          </List.Item>
        </List>
      </ModalComp>
      <DialogTip
        visible={tipVis}
        onClose={() => setTipVis(false)}
        title="Delete this list"
        content="Are you sure you want to delete “Sbgdhaersgdrha” ?"
        actionOpt={actionOpt}
        actions={[
          [
            {
              key: '0',
              text: 'Cancel',
              danger: false,
            },
            {
              key: '1',
              text: 'Delete',
              bold: true,
              danger: true
            },
          ],
        ]}
      />
    </>
  )
}

export default memo(EditFavor)