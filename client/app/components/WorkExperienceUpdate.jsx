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

const WorkExperienceUpdate = ({ id, isModalOpen, toggleModal }) => {
  const context = useContext(ProfileContext)
  const { data, error } = useSWR(`${hostAPI}/user/${id}`, fetcher)
  if (error) return <div>failed to load user info</div>
  if (!data)
    return (
      <div className='flex justify-center my-10'>
        <Loading />
      </div>
    )

  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [date, setDate] = useState([])
  const [startDate, setStartDate] = useState({ month: '', year: '' })
  const [endDate, setEndDate] = useState({ month: '', year: '' })

  // console.log(startDate.month, startDate.year)
  // console.log(endDate.month, endDate.year)

  const handleOk = async () => {
    try {
      const resp = await axios.put(`${hostAPI}/user/profile/update/${id}`, {
        updateItem: 'jobExperience',
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
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 40 }}
      >
        <div className='mt-10'>
          <p className='mb-5 text-gray-400'>* indicates required</p>
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
        </div>
      </Modal>
    </>
  )
}

export default WorkExperienceUpdate
