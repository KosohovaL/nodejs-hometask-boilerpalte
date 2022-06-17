const { fighter } = require('../models/fighter');
const FighterService = require('../services/fighterService')

const powerPattern = /^[1-9]{2}$/;
const createFighterValid = (req, res, next) => {
    if (!req.is('application/json')) {
        res.errorMessage = 'Wrong content type'
        res.status(415)
        return next()
    }

    if (req.body.health === undefined) {
        req.body.health = 100
    }

    const modelFields = Object.keys(fighter).filter(function (field) {
        return field !== 'id'
    }).sort()
    const requestFields = Object.keys(req.body).sort()
    if (JSON.stringify(modelFields) !== JSON.stringify(requestFields)) {
        res.errorMessage = 'Wrong fields'
        console.log('Filds error')
        res.status(400)
        return next()
    }

    const errorFighter = []


    if (req.body.health < 80 || req.body.health > 120) {
        errorFighter.push('Health')
    }

    if (FighterService.search({ name: req.body.name })) {
        errorFighter.push('NoUniqName')
    }

    if (req.body.power < 1 || req.body.power > 100) {
        errorFighter.push('Power')
    }

    if (req.body.defense < 1 || req.body.defense > 10) {
        errorFighter.push('Defense')
    }

    if (errorFighter.length > 0) {
        console.error('Error!')
        res.errorMessage = `Error ${errorFighter.join(', ')}`
        res.status(400)
    }

    return next()
}

const updateFighterValid = (req, res, next) => {

    const fighterID = FighterService.search({ id: req.params.id })

    if (!fighterID) {
        res.errorMessage = 'Fighter not found'
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

    const modelFields = Object.keys(fighter).filter(function (field) {
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

    const errorFighter = []

    if (corectFields.includes('health')) {
        if (req.body.health < 80 || req.body.health > 120) {
            errorFighter.push('Health')
        }
    }

    if (corectFields.includes('name')) {
        if (FighterService.search({ name: req.body.name })) {
            errorFighter.push('NoUniqName')
        }
    }

    if (corectFields.includes('power')) {
        if (req.body.power < 1 || req.body.power > 100) {
            errorFighter.push('Power')
        }
    }

    if (corectFields.includes('defense')) {
        if (req.body.defense < 1 || req.body.defense > 10) {
            errorFighter.push('Defense')
        }
    }

    if (errorFighter.length > 0) {
        console.error('Error!')
        res.errorMessage = `Error ${errorFighter.join(', ')}`
        res.status(400)
    }

    return next()
}

const searchFighterId = (req, res, next) => {
    const fighter = FighterService.search({ id: req.params.id })

    if (!fighter) {
        res.errorMessage = 'Fighter not found'
        res.status(404)
    }
    return next()
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.searchFighterId = searchFighterId;