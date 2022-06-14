const { FightRepository } = require('../repositories/fightRepository');

class FightersService {

    search(search) {
        const item = FightRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    create(data) {
        return FightRepository.create(data);
    }

    list() {
        return FightRepository.getAll();
    }

    update(id, data) {
        return FightRepository.update(id, data);
    }

    delete(id) {
        return FightRepository.delete(id);
    }
}

module.exports = new FightersService();