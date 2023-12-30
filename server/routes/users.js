const express = require('express')
const {
  login,
  updateProfile,
  register,
  getUser,
  getAllUsers,
  editProfile,
  deleteProfile
} = require('../controllers/users')
const upload = require('../utils/uploadImage')

const router = express.Router()

router.post('/login', login)
router.post('/', getAllUsers)
router.get('/:id', getUser)
router.delete('/profile/delete/:id', deleteProfile)
router.put('/profile/update/:id', upload.single('uploadedImg'), editProfile)
router.put('/profile/:id', upload.single('dp'), updateProfile)
router.post('/register', register)

module.exports = router
