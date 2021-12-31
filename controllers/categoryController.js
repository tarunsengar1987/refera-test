var models = require('../models'); // loads index.js
const Category = models.category;

module.exports = {
    create: function (req, res) {
        // Validate request
        var errors = {};
        if (!req.body.name) {
            errors.name = "Category name can not be empty!";
        }
        if (Object.keys(errors).length !== 0) {
            res.status(400).send({ errors: errors });
            return;
        }

        // Create a Category
        const obj = {
            name: req.body.name
        };

        // Save Category in the database
        Category.create(obj)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Category."
                });
            });
    },

    findAll: function (req, res) {
        const name = req.query.name;
        var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        Category.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving categories."
                });
            });
    },

    findOne: function (req, res) {
        const id = req.params.id;

        Category.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Category with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Category with id=" + id
                });
            });
    },

    update: function (req, res) {
        const id = req.params.id;

        var errors = {};
        if (!req.body.name) {
            errors.name = "Category name can not be empty!";
        }
        if (Object.keys(errors).length !== 0) {
            res.status(400).send({ errors: errors });
            return;
        }

        const obj = {
            name: req.body.name
        };

        Category.update(obj, {
            where: { id: id }
        }).then(num => {
            let message = 'Category updated successfully.';
            if (num != 1) {
                message = 'Error updating category.';
            }
            res.send({ message: message });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Category."
            });
        });
    },

    delete: function (req, res) {
        const id = req.params.id;

        Category.destroy({
            where: { id: id }
        }).then(num => {
            let message = 'Category updated successfully.';
            if (num != 1) {
                message = 'Error updating category.';
            }
            res.send({ message: message });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Category."
            });
        });
    },

    deleteAll: function (req, res) {
        Category.destroy({
            where: {},
            truncate: false
        }).then(nums => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all categories."
            });
        });
    }
}
