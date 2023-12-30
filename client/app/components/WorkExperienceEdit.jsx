'use client'
import { useState, useContext, useEffect } from 'react'
import { Modal, Input, DatePicker } from 'antd'
const { RangePicker } = DatePicker
const { TextArea } = Input
import useSWR from 'swr'
import fetcher from '@app/utils/fetchData'
import Loading from '@app/components/Loading'
import { ProfileContext } from './Providers'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'
import DeletePrompt from './DeletePrompt'

export default function WorkExperienceEdit({
  id,
  isModalOpen,
  toggleModal,
  workID
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
  const work = data.jobExperienceInfo.find((work) => work.id === workID)

  const [jobTitle, setJobTitle] = useState(work.jobTitle)
  const [company, setCompany] = useState(work.company)
  const [jobDescription, setJobDescription] = useState(work.jobDescription)
  const [date, setDate] = useState([])
  const [formError, setFormError] = useState(false)
  const [startDate, setStartDate] = useState({ month: '', year: '' })
  const [endDate, setEndDate] = useState({ month: '', year: '' })
  const [isDelete, setIsDelete] = useState(false)

  // console.log(startDate.month, startDate.year)
  // console.log(endDate.month, endDate.year)

  const handleUpdate = async () => {
    if (date.length === 0 || jobTitle.trim() === '' || company.trim() === '') {
      setFormError(true)
      return
    }
    try {
      const resp = await axios.put(`${hostAPI}/user/profile/update/${id}`, {
        updateItem: 'jobExperienceItem',
        workID,
        jobTitle,
        company,
        jobDescription,
        date: JSON.stringify({
          sm: startDate.month,
          sy: startDate.year,
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
        `${hostAPI}/user/profile/delete/${id}?workID=${workID}&deleteItem=jobExperience`
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
    if (date.length > 0) {
      const startDateArray = date[0]?.$d.toString().split(' ')
      const endDateArray = date[1]?.$d.toString().split(' ')
      setStartDate({ month: startDateArray[1], year: startDateArray[3] })
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
            Update Work Experience
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
            <label className='text-gray-400'>Job Title *</label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className='mb-5'>
            <label className='text-gray-400'>Company Name *</label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className='mb-5 flex justify-between items-center'>
            <label className='text-gray-400'>Duration *</label>
            <RangePicker onChange={dateHandler} />
          </div>
          <div className='mb-5'>
            <label className='text-gray-400'>Job Description</label>
            <TextArea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
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
