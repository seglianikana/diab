const { isPermitted } = require("./isPermitted")
const isAuth = require("./auth")
const handleUser = require("./handleUser")

module.exports = {
  isPermitted,
  isAuth,
  handleUser
}
