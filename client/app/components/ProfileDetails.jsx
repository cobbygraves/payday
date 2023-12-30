'use client'
import { useState } from 'react'
import { Modal, Input, Select, Button, notification } from 'antd'
import { CgAsterisk } from 'react-icons/cg'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { MdLocationPin } from 'react-icons/md'
const { TextArea } = Input
import ImageUpload from './ImageUpload'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { hostAPI } from '@app/utils/configure'

const sector = [
  {
    value: 'education',
    label: 'Education'
  },
  {
    value: 'health',
    label: 'Health'
  },
  {
    value: 'judiciary',
    label: 'Judiciary'
  },
  {
    value: 'administration',
    label: 'Administration'
  },
  {
    value: 'transportation',
    label: 'Transportation'
  },
  {
    value: 'engineering',
    label: 'Engineering'
  },
  {
    value: 'fashion',
    label: 'Fashion & Design'
  },
  {
    value: 'agriculture',
    label: 'Agriculture'
  },
  {
    value: 'fabrication',
    label: 'Fabrication'
  },
  {
    value: 'security',
    label: 'Security'
  }
]

const ProfileDetails = ({ id, open }) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState([])
  const [category, setCategory] = useState('education')
  const [contact, setContact] = useState('')
  const [experience, setExperience] = useState('')
  const [imgURL, setImageURL] = useState('')
  const [imgFile, setImageFile] = useState(null)
  const [title, setTitle] = useState('')
  const [showError, setShowError] = useState(false)
  const [locationError, setLocationError] = useState({
    isError: false,
    message: 'api loaded successfully'
  })
  const [town, setTown] = useState('')
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'LOCATION ERROR',
      description: 'User location could not be determined'
    })
  }

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value)
    setAddress(value)
    const latlng = await getLatLng(result[0])
    setTown(result[0].address_components[2].long_name)
    setLocation([latlng.lat, latlng.lng])
  }

  const submitHandler = async () => {
    console.log(location)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('dp', imgFile)
    formData.append('jobTitle', title)
    formData.append('sector', category)
    formData.append('location', JSON.stringify(location))
    formData.append('jobDescription', experience)
    formData.append('contact', contact)
    formData.append('town', town)
    if (title.trim() === '' || location === null || contact.trim() === '') {
      setShowError(true)
      setSubmitting(false)
      return
    }
    try {
      await axios.put(`${hostAPI}/user/profile/${id}`, formData)
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      openNotificationWithIcon('error')
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }

  const handleChange = (e) => {
    setImageFile(e.target.files[0])
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const cancelHandler = () => {
    router.push('/')
  }

  const onErrorMaps = (status, clearSuggestions) => {
    // console.log('Google Maps API returned error with status: ', status)
    setLocationError({ isError: true, message: status })
    clearSuggestions()
  }

  if (locationError.isError) {
    return (
      <p className=' text-xl text-center font-bold text-red-600 mt-10'>
        GoogleMaps could not be loaded, please make sure you're connected to the
        internet
      </p>
    )
  }

  return (
    <Modal
      title={<p className='text-center'>complete your registration below</p>}
      open={!open}
      footer={null}
      width={400}
      bodyStyle={{ height: 375, overflowY: 'scroll' }}
      style={{ top: 50 }}
      closable
      onCancel={cancelHandler}
    >
      <div className='flex flex-col gap-3'>
        {contextHolder}
        <div>
          <ImageUpload
            deleteImgFile={() => setImageFile(null)}
            handleChange={handleChange}
            imgFile={imgFile}
            imgURL={imgURL}
            imgH='125px'
            imgW='125px'
            isRounded
          />
        </div>
        <div>
          <div className='flex items-center'>
            <label className='font-bold'>Job Title</label>
            <CgAsterisk color='red' />
          </div>

          <Input
            placeholder='eg. Teacher,Carpenter, Lawyer, Driver etc'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className='font-bold'>Sector</label>
          <Select
            defaultValue='education'
            style={{
              width: '100%'
            }}
            onChange={(value) => {
              setCategory(value)
            }}
            options={sector}
          />
        </div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
          onError={onErrorMaps}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <div className='flex items-center'>
                <label className='font-bold'>Location</label>
                <CgAsterisk color='red' />
              </div>
              <Input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input'
                })}
              />
              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? ' bg-gray-100 cursor-pointer'
                    : ''
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                      key={suggestion.index}
                    >
                      <span className='flex gap-2 items-center'>
                        <MdLocationPin />
                        {suggestion.description}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div>
          <div className='flex items-center'>
            <label className='font-bold'>Contact Number</label>
            <CgAsterisk color='red' />
          </div>
          <Input
            placeholder='telephone no:'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label className='font-bold'>Job Profile</label>
          <TextArea
            rows={4}
            placeholder='describe your job experience'
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <Button
          type='primary'
          style={{ backgroundColor: 'black' }}
          loading={submitting}
          onClick={submitHandler}
        >
          Submit Details
        </Button>
        {showError && (
          <p className='text-small text-red-500 mb-5 italic'>
            fields marked asterisks are mandatory
          </p>
        )}
      </div>
    </Modal>
  )
}

export default ProfileDetails
