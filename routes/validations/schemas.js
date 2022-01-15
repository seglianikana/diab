const {string, phone, required, object, check, combine, oneOf} = require('sito')
const {User} = require('../../db/models')


const isUniqueEmail = phone => !User.countDocuments({phone})
const isPasswordsSame = (pass, confirmPass) => pass === confirmPass

const userSchema = payload => object({
        firstName: () => string()
            .required(),
        lastName: () => string()
            .required(),
        password: () => string().required().combine(
            check(
                {
                    validate: value => isPasswordsSame(value.payload.confirmPassword),
                    message: (path, value) => `Passwords are not the same`
                }
            )
        ),
        email: () => string().required().combine(
            check({
                validate: value => isUniqueEmail(value),
                message: (path, value) => `The user with ${path}:${value} is already exists`
            })
        ),
    }
)


module.exports = {
    userSchema
}
