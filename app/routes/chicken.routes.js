module.exports = (app) => {
    const chickens = require('../controllers/chicken.controller.js');

    app.post('/chicken', chickens.create);

    app.get('/chicken', chickens.findAll);

    app.put('/chicken/:chickenId', chickens.update);

    app.delete('/chicken/:chickenId', chickens.delete);

    app.patch('/chicken/:chickenId', chickens.patch);

    app.patch('/chicken/run/:chickenId', chickens.run);
}
