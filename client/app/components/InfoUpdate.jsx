'use client'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'
import { ProfileContext } from './Providers'
import { CgAsterisk } from 'react-icons/cg'
import { MdLocationPin } from 'react-icons/md'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { Modal, Input, Button, notification } from 'antd'
import useSWR from 'swr'
import fetcher from '@app/utils/fetchData'
import Loading from '@app/components/Loading'

export default function InfoUpdate({ isModalOpen, toggleModal, id }) {
  const context = useContext(ProfileContext)
  const { data, error } = useSWR(`${hostAPI}/user/${id}`, fetcher)
  if (error) return <div>failed to load user info</div>
  if (!data)
    return (
      <div className='flex justify-center my-10'>
        <Loading />
      </div>
    )
  const [town, setTown] = useState(data?.town)
  const [contact, setContact] = useState(data?.contact)
  const [title, setTitle] = useState(data?.jobTitle)
  const [name, setName] = useState(data?.name)
  const [address, setAddress] = useState(data?.town)
  const [location, setLocation] = useState(data?.location)
  const [showError, setShowError] = useState(false)
  const [locationError, setLocationError] = useState({
    isError: false,
    message: 'api loaded successfully'
  })

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

  const handleOk = async () => {
    const formData = new FormData()
    formData.append('updateItem', 'info')
    formData.append('jobTitle', title)
    formData.append('location', JSON.stringify(location))
    formData.append('name', name)
    formData.append('contact', contact)
    formData.append('town', town)
    if (
      title.trim() === '' ||
      location === null ||
      contact.trim() === '' ||
      town.trim() === ''
    ) {
      setShowError(true)
      setSubmitting(false)
      return
    }
    try {
      const resp = await axios.put(
        `${hostAPI}/user/profile/update/${id}`,
        formData
      )
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
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 100 }}
      >
        <div className='flex flex-col gap-3'>
          {contextHolder}
          <p className=' font-bold text-xl text-center'>Update Info</p>
          <div>
            <div className='flex items-center'>
              <label className='font-bold'>Name</label>
              <CgAsterisk color='red' />
            </div>

            <Input
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          {/* <Button
          type='primary'
          style={{ backgroundColor: 'black' }}
          loading={submitting}
          onClick={submitHandler}
        >
          Submit Details
        </Button> */}
          {showError && (
            <p className='text-small text-red-500 mb-5 italic'>
              fields marked asterisks are mandatory
            </p>
          )}
        </div>
      </Modal>
    </>
  )
}
