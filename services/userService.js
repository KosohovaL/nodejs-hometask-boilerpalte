const { UserRepository } = require('../repositories/userRepository');

class UserService {

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    create(data) {
        return UserRepository.create(data);
    }

    list() {
        return UserRepository.getAll();
    }

    update(id, data) {
        return UserRepository.update(id, data);
    }

    delete(id) {
        return UserRepository.delete(id);
    }
}

module.exports = new UserService();