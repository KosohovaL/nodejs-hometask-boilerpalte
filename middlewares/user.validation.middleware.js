const { user } = require('../models/user');
const UserService = require('../services/userService');
const firstNamePattern = /^[a-z]{1,16}$/i;
// const emailPattern = /^[A-Z0-9._%+-]+@gmail.com$/i;
const emailPattern = /^.+@gmail\.com$/;
const phonePattern = /^\+380\d{9}$/;
const passwordPattern = /^[0-9a-zA-Z!@#$%^&*]{3,}$/;
const createUserValid = (req, res, next) => {
    const errorField = []
    const errorUnique = []

    if (!req.is('application/json')) {
        res.errorMessage = 'Wrong content type'
        res.status(415)
        return next()
    }

    const modelFields = Object.keys(user).filter(function (field) {
        return field !== 'id'
    }).sort()
    const requestFields = Object.keys(req.body).sort()
    if (JSON.stringify(modelFields) !== JSON.stringify(requestFields)) {
        res.errorMessage = 'Wrong fields'
        console.log('Filds error')
        res.status(400)
        return next()
    }

    if (!emailPattern.test(req.body.email)) {
        errorField.push('Email')
    }

    if (UserService.search({ email: req.body.email })) {
        errorUnique.push('NoUniqEmail')
    }

    if (!phonePattern.test(req.body.phoneNumber)) {
        errorField.push('Phone')
    }

    if (UserService.search({ phoneNumber: req.body.phoneNumber })) {
        errorUnique.push('NoUniqPhone')
    }

    if (!passwordPattern.test(req.body.password)) {
        errorField.push('Password')
    }

    if ((errorField.length > 0) || (errorUnique.length > 0)) {
        console.error('Error!')
        res.errorMessage = `Error ${errorField.join(', ')} ${errorUnique.join(', ')}`
        res.status(400)
    }
    return next()
}

const updateUserValid = (req, res, next) => {
    const userID = UserService.search({ id: req.params.id })

    if (!userID) {
        res.errorMessage = 'User not found'
        res.status(404)
        return next()
    }

    const reqFields = Object.keys(req.body)


    if (reqFields.length === 0) {
        res.errorMessage = 'Empty req'
        res.status(400)
        return next()
    }

    const wrongFields = []
    const corectFields = []

    const modelFields = Object.keys(user).filter(function (field) {
        return field !== 'id'
    }).sort()

    for (let i in req.body) {
        if (!modelFields.includes(i)) {
            wrongFields.push(i)
        } else {
            corectFields.push(i)
        }
    }

    if (wrongFields.length > 0) {
        res.errorMessage = 'Wrong fields'
        res.status(400)
        return next()
    }

    const errorField = []
    const errorUnique = []

    if (corectFields.includes('email')) {
        if (!emailPattern.test(req.body.email)) {
            errorField.push('Email')
        }
    }

    if (corectFields.includes('email')) {
        if (UserService.search({ email: req.body.email })) {
            errorUnique.push('NoUniqEmail')
        }
    }

    if (corectFields.includes('phoneNumber')) {
        if (!phonePattern.test(req.body.phoneNumber)) {
            errorField.push('Phone')
        }
    }

    if (corectFields.includes('phoneNumber')) {
        if (UserService.search({ phoneNumber: req.body.phoneNumber })) {
            errorUnique.push('NoUniqPhone')
        }
    }

    if (corectFields.includes('password')) {
        if (!passwordPattern.test(req.body.password)) {
            errorField.push('Password')
        }
    }

    if ((errorField.length > 0) || (errorUnique.length > 0)) {
        console.error('Error!')
        res.errorMessage = `Error ${errorField.join(', ')} ${errorUnique.join(', ')}`
        res.status(400)
    }

    return next()
}

const searchUserId = (req, res, next) => {
    const user = UserService.search({ id: req.params.id })

    if (!user) {
        res.errorMessage = 'User not found'
        res.status(404)
    }
    return next()
}


exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.searchUserId = searchUserId;