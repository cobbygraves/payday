const { UserModel } = require('../models/users.js')
const bcrypt = require('bcryptjs')
const { signJWTAccessToken } = require('../utils/apiAuthorization.js')
const { v4: uuidv4 } = require('uuid')

function compareBcryptAsync(param1, param2) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

const login = async (req, res) => {
  const user = req.body
  const userData = await UserModel.findOne({ email: user.username })

  if (
    userData &&
    (await compareBcryptAsync(user.password, userData.password))
  ) {
    const { password, ...userInfo } = userData
    const accessToken = signJWTAccessToken(userInfo)
    const { password: pwd, ...userDetails } = userInfo._doc
    return res.status(200).json({
      ...userDetails,
      accessToken
    })
  } else {
    return res.status(401).json(null)
  }
}

const getUser = async (req, res) => {
  const userData = await UserModel.findOne({ _id: req.params.id })
  const { password, ...userInfo } = userData
  return res.json(userInfo._doc)
}

const getAllUsers = async (req, res) => {
  const { latitude, longitude } = req.body
  // console.log(longitude, latitude)
  const userData = await UserModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], 10 / 3963.2]
      }
    }
  })

  res.json(userData)
}

const updateProfile = async (req, res) => {
  let longlat = req.body.location
  longlat = longlat.replace(/[\u0000-\u0019]+/g, '')
  const formattedLngLat = JSON.parse(longlat)
  if (formattedLngLat.length === 0) {
    return res
      .status(400)
      .json({ message: 'User location could not be determined' })
  }
  const updateInfo = {
    ...req.body,
    dp: req.file.filename,
    location: formattedLngLat
  }
  const userData = await UserModel.findOne({ _id: req.params.id })
  const userUpdate = { ...userData._doc, ...updateInfo, completed: true }
  // const updatedUser = new UserModel(userUpdate)
  const responseData = await UserModel.findOneAndReplace(
    { _id: req.params.id },
    userUpdate,
    {
      new: true
    }
  )
  res.json(responseData)
}

const deleteProfile = async (req, res) => {
  const userData = await UserModel.findOne({ _id: req.params.id })
  let workId = null
  let educationId = null
  let updateInfo = null
  if (req.query.deleteItem === 'jobExperience') {
    workId = req.query.workID
    const jobExperience = userData._doc.jobExperienceInfo
    const updatedJobExperience = jobExperience.filter(
      (job) => job.id !== workId
    )
    updateInfo = {
      jobExperienceInfo: updatedJobExperience
    }
  }

  if (req.query.deleteItem === 'education') {
    educationId = req.query.educationId
    const education = userData._doc.educationInfo
    const updatedEducation = education.filter((sch) => sch.id !== educationId)
    updateInfo = {
      educationInfo: updatedEducation
    }
  }

  const userUpdate = { ...userData._doc, ...updateInfo }
  const responseData = await UserModel.findOneAndReplace(
    { _id: req.params.id },
    userUpdate,
    {
      new: true
    }
  )
  res.json(responseData)
}

const editProfile = async (req, res) => {
  let updateInfo = null
  const userData = await UserModel.findOne({ _id: req.params.id })
  if (req.body.updateItem === 'bg') {
    updateInfo = {
      bg: req.file.filename
    }
  }

  if (req.body.updateItem === 'dp') {
    updateInfo = {
      dp: req.file.filename
    }
  }

  if (req.body.updateItem === 'info') {
    let longlat = req.body.location
    longlat = longlat.replace(/[\u0000-\u0019]+/g, '')
    const formattedLngLat = JSON.parse(longlat)
    if (formattedLngLat.length === 0) {
      return res
        .status(400)
        .json({ message: 'User location could not be determined' })
    }
    updateInfo = {
      ...req.body,
      location: formattedLngLat
    }
  }

  if (req.body.updateItem === 'status') {
    updateInfo = {
      ...req.body
    }
  }

  if (req.body.updateItem === 'jobExperience') {
    const { jobTitle, company, jobDescription, date } = req.body
    const jobExperience = userData._doc.jobExperienceInfo
    updateInfo = {
      jobExperienceInfo: [
        ...jobExperience,
        {
          id: Date.now().toString(),
          jobTitle,
          company,
          jobDescription,
          date: JSON.parse(date)
        }
      ]
    }
  }

  if (req.body.updateItem === 'education') {
    const { course, school, date } = req.body
    const education = userData._doc.educationInfo
    console.log(date)
    updateInfo = {
      educationInfo: [
        ...education,
        {
          id: Date.now().toString(),
          course,
          school,
          date: JSON.parse(date)
        }
      ]
    }
  }

  if (req.body.updateItem === 'jobExperienceItem') {
    const { date, workID } = req.body
    const jobExperience = userData._doc.jobExperienceInfo
    const updatedJobExperience = jobExperience.map((job) =>
      job.id === workID
        ? { ...req.body, date: JSON.parse(date), id: workID }
        : job
    )

    updateInfo = {
      jobExperienceInfo: updatedJobExperience
    }
  }

  if (req.body.updateItem === 'educationItem') {
    const { date, educationID } = req.body
    const education = userData._doc.educationInfo
    const updatedEducation = education.map((sch) =>
      sch.id === educationID
        ? { ...req.body, date: JSON.parse(date), id: educationID }
        : sch
    )

    updateInfo = {
      educationInfo: updatedEducation
    }
  }

  const userUpdate = { ...userData._doc, ...updateInfo }
  const responseData = await UserModel.findOneAndReplace(
    { _id: req.params.id },
    userUpdate,
    {
      new: true
    }
  )
  res.json(responseData)
}

const register = async (req, res) => {
  const user = req.body
  const userData = await UserModel.findOne({ email: user.username })
  if (!userData) {
    const newUser = new UserModel({
      _id: uuidv4(),
      name: user.name,
      email: user.username,
      password: await bcrypt.hash(user.password, 10)
    })
    const resp = await newUser.save()

    return res.json({ _id: resp._id, name: resp.name, email: resp.email })
  } else {
    return res.status(401).json({ error: 'User Already Exist, Please Login' })
  }
}

module.exports = {
  login,
  updateProfile,
  register,
  getUser,
  getAllUsers,
  editProfile,
  deleteProfile
}
