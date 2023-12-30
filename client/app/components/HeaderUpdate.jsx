'use client'
import React, { useState, useContext } from 'react'
import { Modal } from 'antd'
import ImageUpload from './ImageUpload'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'
import { ProfileContext } from './Providers'

export default function HeaderUpdate({ isModalOpen, toggleModal, id }) {
  const [imgURL, setImageURL] = useState('')
  const [imgFile, setImageFile] = useState(null)
  const context = useContext(ProfileContext)

  const handleChange = (e) => {
    setImageFile(e.target.files[0])
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const handleOk = async () => {
    const formData = new FormData()
    formData.append('uploadedImg', imgFile)
    formData.append('updateItem', 'bg')

    const resp = await axios.put(
      `${hostAPI}/user/profile/update/${id}`,
      formData
    )
    if (resp.status === 200) {
      context.editProfileHandler(false)
      window.location.reload()

      toggleModal(false)
    }
  }

  const handleCancel = () => {
    toggleModal(false)
    setImageFile(null)
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 100 }}
      >
        <div className='mt-7'>
          <ImageUpload
            imgFile={imgFile}
            imgURL={imgURL}
            handleChange={handleChange}
            deleteImgFile={() => setImageFile(null)}
            imgH='250px'
            imgW='100%'
          />
        </div>
      </Modal>
    </>
  )
}
