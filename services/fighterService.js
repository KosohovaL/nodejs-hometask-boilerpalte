const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

    search(search) {
        const item = FighterRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    create(data) {
        return FighterRepository.create(data);
    }

    list() {
        return FighterRepository.getAll();
    }

    update(id, data) {
        return FighterRepository.update(id, data);
    }

    delete(id) {
        return FighterRepository.delete(id);
    }

}

module.exports = new FighterService();