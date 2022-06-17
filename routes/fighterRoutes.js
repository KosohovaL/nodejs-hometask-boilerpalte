const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware, errorJson } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, searchFighterId } = require('../middlewares/fighter.validation.middleware');

const router = Router();


router.get('/', responseMiddleware, (req, res) => {
    try {
        res.json(FighterService.list())
    } catch (e) {
        res.status(500).json(e.message)
    }
});

router.get('/:id', searchFighterId, responseMiddleware, errorJson, (req, res) => {
    try {
        res.json(FighterService.search({ id: req.params.id }))
    } catch (e) {
        res.status(500).json(e.message)
    }
});

router.post('/', createFighterValid, responseMiddleware, errorJson, (req, res) => {
    console.log(req.body)
    try {
        res.json(FighterService.create(req.body))
    } catch (e) {
        res.status(500).json(e.message)
    }
});

router.put('/:id', updateFighterValid, responseMiddleware, errorJson, (req, res) => {
    try {
        res.json(FighterService.update(req.params.id, req.body))
    } catch (e) {
        res.status(500).json(e.message)
    }
});

router.delete('/:id', (req, res) => {
    try {
        res.json(FighterService.delete(req.params.id))
    } catch (e) {
        res.status(500).json(e.message)
    }
});


module.exports = router;