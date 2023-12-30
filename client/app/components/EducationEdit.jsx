'use client'
import { useState, useContext, useEffect } from 'react'
import { Modal, Input, DatePicker } from 'antd'
// const { RangePicker } = DatePicker
const { TextArea } = Input
import useSWR from 'swr'
import fetcher from '@app/utils/fetchData'
import Loading from '@app/components/Loading'
import { ProfileContext } from './Providers'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'
import DeletePrompt from './DeletePrompt'

export default function EducationEdit({
  id,
  isModalOpen,
  toggleModal,
  educationID
}) {
  const context = useContext(ProfileContext)
  const { data, error } = useSWR(`${hostAPI}/user/${id}`, fetcher)

  if (error) return <div>failed to load user info</div>
  if (!data)
    return (
      <div className='flex justify-center my-10'>
        <Loading />
      </div>
    )
  const education = data.educationInfo.find((sch) => sch.id === educationID)

  const [course, setCourse] = useState(education.course)
  const [school, setSchool] = useState(education.school)

  const [date, setDate] = useState(null)
  const [formError, setFormError] = useState(false)

  const [endDate, setEndDate] = useState({ month: '', year: '' })
  const [isDelete, setIsDelete] = useState(false)

  const handleUpdate = async () => {
    if (date.length === 0 || course.trim() === '' || school.trim() === '') {
      setFormError(true)
      return
    }
    try {
      const resp = await axios.put(`${hostAPI}/user/profile/update/${id}`, {
        updateItem: 'educationItem',
        educationID,
        course,
        school,

        date: JSON.stringify({
          em: endDate.month,
          ey: endDate.year
        })
      })
      if (resp.status === 200) {
        context.editProfileHandler(false)
        window.location.reload()
        toggleModal(false)
      }
    } catch (error) {
      // openNotificationWithIcon('error')
      setTimeout(() => {
        // router.push('/')
      }, 3000)
    }
  }

  const handleCancel = () => {
    toggleModal(false)
  }

  const handleDelete = async () => {
    try {
      const resp = await axios.delete(
        `${hostAPI}/user/profile/delete/${id}?educationId=${educationID}&deleteItem=education`
      )
      if (resp.status === 200) {
        context.editProfileHandler(false)
        window.location.reload()
        toggleModal(false)
      }
    } catch (error) {
      // openNotificationWithIcon('error')
      setTimeout(() => {
        // router.push('/')
      }, 3000)
    }
  }

  const dateHandler = (dateValue) => {
    setDate(dateValue)
  }

  useEffect(() => {
    if (date > 0) {
      //   const startDateArray = date[0]?.$d.toString().split(' ')
      const endDateArray = date?.$d.toString().split(' ')
      //   setStartDate({ month: startDateArray[1], year: startDateArray[3] })
      setEndDate({ month: endDateArray[1], year: endDateArray[3] })
    }
  }, [date])

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ top: 40 }}
        footer={null}
      >
        <div className='mt-10 relative'>
          {isDelete && (
            <DeletePrompt
              handleNo={() => setIsDelete(false)}
              handleYes={handleDelete}
            />
          )}

          <p className='text-center font-bold text-2xl mb-5'>
            Update Education
          </p>
          <p className='mb-5 text-gray-400'>
            * indicates required{' '}
            {formError && (
              <span className='text-red-500 ml-3'>
                field marked * are required
              </span>
            )}
          </p>
          <div className='mb-5'>
            <label className='text-gray-400'>Course *</label>
            <Input value={course} onChange={(e) => setCourse(e.target.value)} />
          </div>

          <div className='mb-5'>
            <label className='text-gray-400'>Institution *</label>
            <Input value={school} onChange={(e) => setSchool(e.target.value)} />
          </div>
          <div className='mb-5 flex justify-between items-center'>
            <label className='text-gray-400'>Completed *</label>
            <DatePicker onChange={dateHandler} />
          </div>
          <div className='flex items-center justify-between px-5 text-white'>
            <div>
              <button
                className=' bg-red-600 rounded px-2 py-1'
                onClick={() => setIsDelete(true)}
              >
                Delete
              </button>
            </div>
            <div className='flex items-center gap-x-5'>
              <button
                className=' bg-yellow-600 rounded px-2 py-1'
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className=' bg-black rounded px-2 py-1'
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
