'use client'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'
import { ProfileContext } from './Providers'
import { Modal, Input, notification } from 'antd'
const { TextArea } = Input
import useSWR from 'swr'
import fetcher from '@app/utils/fetchData'
import Loading from '@app/components/Loading'

export default function StatusUpdate({ isModalOpen, toggleModal, id }) {
  const context = useContext(ProfileContext)
  const { data, error } = useSWR(`${hostAPI}/user/${id}`, fetcher)
  if (error) return <div>failed to load user info</div>
  if (!data)
    return (
      <div className='flex justify-center my-10'>
        <Loading />
      </div>
    )

  const [status, setStatus] = useState(data?.profileDesc)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'LOCATION ERROR',
      description: 'User location could not be determined'
    })
  }

  const handleOk = async () => {
    try {
      const resp = await axios.put(`${hostAPI}/user/profile/update/${id}`, {
        updateItem: 'status',
        profileDesc: status
      })
      if (resp.status === 200) {
        context.editProfileHandler(false)
        window.location.reload()
        toggleModal(false)
      }
    } catch (error) {
      setSubmitting(false)
      openNotificationWithIcon('error')
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }

  const handleCancel = () => {
    toggleModal(false)
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 100 }}
      >
        <div className='flex flex-col gap-3'>
          {contextHolder}
          <p className=' font-bold text-xl text-center'>Update Status</p>

          <TextArea
            rows={6}
            placeholder='describe your job experience'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </Modal>
    </>
  )
}
