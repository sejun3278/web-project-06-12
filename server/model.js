const sequelize = require('./models').sequelize;
const {
    Picture,
    Sequelize: { Op }
} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    get : {
        data : callback => {
            Picture.findAll()
            .then(data => { callback(data) })
            .catch(err => { throw err });
        }
    },

    add : {
        data : (body, callback) => {
            Picture.create({
                id : body.id,
                image_url : body.image_url,
                nickname : body.nickname,
                profile_image_url : body.profile_image_url
            })
            .then(data => { callback(data) })
            .catch(err => { throw err })
        }
    }
}