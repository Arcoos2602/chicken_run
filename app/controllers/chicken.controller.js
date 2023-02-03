const Chicken = require('../models/chicken.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Chicken content can not be empty"
        });
    }

    const chicken = new Chicken({
        name: req.body.name,
        weight: req.body.weight,
        birthday: req.body.birthday,
        steps: req.body.steps,
        isRunning: req.body.isRunning,
    });

    chicken.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Chicken."
        });
    });
};

exports.findAll = (req, res) => {
    Chicken.find()
    .then(chickens => {
        res.send(chickens);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving chickens."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Chicken content can not be empty"
        });
    }

    Chicken.findByIdAndUpdate(req.params.chickenId, {
        name: req.body.name,
        weight: req.body.weight,
        steps: req.body.steps,
        birthday: req.body.birthday,
        isRunning: req.body.isRunning,
    }, {new: true})
    .then(chicken => {
        if(!chicken) {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });
        }
        res.send(chicken);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });                
        }
        return res.status(500).send({
            message: "Error updating chicken with id " + req.params.chickenId
        });
    });
};

exports.delete = (req, res) => {
    Chicken.findByIdAndRemove(req.params.chickenId)
    .then(chicken => {
        if(!chicken) {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });
        }
        res.send({message: "Chicken deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });                
        }
        return res.status(500).send({
            message: "Could not delete chicken with id " + req.params.chickenId
        });
    });
};

exports.patch = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Chicken content can not be empty"
        });
    }

    Chicken.findByIdAndUpdate(req.params.chickenId, {
        name: req.body.name,
        weight: req.body.weight,
        steps: req.body.steps,
        birthday: req.body.birthday,
        isRunning: req.body.isRunning,
    }, {new: true})
    .then(chicken => {
        if(!chicken) {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });
        }
        res.send(chicken);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });                
        }
        return res.status(500).send({
            message: "Error updating chicken with id " + req.params.chickenId
        });
    });
}

exports.run = (req, res) => {
    Chicken.findByIdAndUpdate(req.params.chickenId, {
        $inc : {'steps' : 1},
    }, {new: true})
    .then(chicken => {
        if(!chicken) {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });
        }
        res.send(chicken);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Chicken not found with id " + req.params.chickenId
            });                
        }
        return res.status(500).send({
            message: "Error updating chicken with id " + req.params.chickenId
        });
    });
};
