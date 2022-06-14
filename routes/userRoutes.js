const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid, searchUserId } = require('../middlewares/user.validation.middleware');
const { responseMiddleware, errorJson } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', responseMiddleware, (req, res) => {
    try {
        res.json(UserService.list())
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.get('/:id', searchUserId, responseMiddleware, errorJson, (req, res) => {
    try {
        res.json(UserService.search({ id: req.params.id }))
    } catch (e) {
        res.status(500).json(e.message)
    }
});

router.post('/', createUserValid, responseMiddleware, errorJson, (req, res) => {
    try {
        res.json(UserService.create(req.body))
    } catch (e) {
        res.status(500).json(e.message)
    }
});

router.put('/:id', searchUserId, responseMiddleware, errorJson, (req, res) => {
    try {
        res.json(UserService.update(req.params.id, req.body))
    } catch (e) {
        res.status(500).json(e.message)
    }
});

router.delete('/:id', searchUserId, responseMiddleware, errorJson, (req, res) => {
    try {
        res.json(UserService.delete(req.params.id))
    } catch (e) {
        res.status(500).json(e.message)
    }
});

module.exports = router;