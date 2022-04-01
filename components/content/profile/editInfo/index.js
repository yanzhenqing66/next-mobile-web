import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Input, DatePicker, Picker } from 'antd-mobile'
import dayjs from 'dayjs'
import { anth_login_dispatch } from '@/store/user/actions/auth'
import style from './editInfo.module.scss'

const now = new Date()

function getPreYear(count) {
  var time = new Date()
  var year = time.getFullYear()
  // const toTime = (year - count) + '-' + '01' + '-' + '01'
  const toTime = year - count
  return new Date(toTime)
}

const formatSex = (sex, sexList) => {
  if (!sex) return ['Not specified']
  return [sexList[0][sex]]
}

const formatBirth = (birth) => {
  if (!birth) return ''
  return new Date(birth)
}


function EditInfo({ onFinish }) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [pickerVisible, setPickerVisible] = useState(false)
  const [sexList] = useState([['Not specified', 'Male', 'Female', 'Other']])
  const [sexVis, setSexVis] = useState(false)

  useEffect(() => {
    if (!user.id) {
      dispatch(anth_login_dispatch())
    }
  }, [])

  return (
    <>
      {
        user.id ?
          <Form
            onFinish={onFinish}
            initialValues={{
              nickName: user?.nickName,
              sex: formatSex(user?.sex, sexList),
              birthday: formatBirth(user?.birthday) || now,
              location: user?.location
            }}
            footer={
              <Button block type='submit' className={style.saveBtn}>
                Save
              </Button>
            }
            className="editInfo"
          >
            <Form.Item
              name='nickName'
              label='NickName'
              rules={[{ required: true, message: 'Please enter nickName' }]}
            >
              <Input placeholder='Please enter nickName' />
            </Form.Item>
            <Form.Item
              name='sex'
              label='Gender'
              trigger='onConfirm'
              onClick={() => {
                setSexVis(true)
              }}
            >
              <Picker
                columns={sexList}
                visible={sexVis}
                onClose={() => {
                  setSexVis(false)
                }}
                confirmText="Done"
                cancelText="cancel"
              >
                {items => {
                  if (items.every(item => item === null)) {
                    return 'Not specified'
                  } else {
                    return items.map(item => item?.label ?? 'Not specified')
                  }
                }}
              </Picker>
            </Form.Item>
            <Form.Item
              name='birthday'
              label='Date of birth'
              trigger='onConfirm'
              onClick={() => {
                setPickerVisible(true)
              }}
            >
              <DatePicker
                // getContainer={document.querySelector('#_next')}
                visible={pickerVisible}
                max={now}
                min={getPreYear(50)}
                // defaultValue={now}
                confirmText="Done"
                cancelText="cancel"
                onClose={() => {
                  setPickerVisible(false)
                }}
              >
                {value => value ? dayjs(value).format('YYYY-MM-DD') : 'Select date of birth'}
              </DatePicker>
            </Form.Item>
            <Form.Item
              name='location'
              label='Location'
            >
              <Input placeholder='Enter location' />
            </Form.Item>
          </Form>
          : null
      }
    </>

  )
}

export default EditInfo