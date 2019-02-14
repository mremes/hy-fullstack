if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

console.log(process.env.PORT)
let PORT = process.env.PORT
let DB_URI = process.env.DB_URI

module.exports = {
  DB_URI,
  PORT
}