const jwt = require('jsonwebtoken')

const DEFAULT_SIGN_OPTION = {
  expiresIn: '1h'
}

function signJWTAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
  const secretKey = process.env.SECRET
  const token = jwt.sign(payload, secretKey, options)
  return token
}

function verifyJWTAccessToken(token) {
  try {
    const secretKey = process.env.SECRET
    const decodedToken = jwt.verify(token, secretKey)
    return decodedToken
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  signJWTAccessToken,
  verifyJWTAccessToken
}
