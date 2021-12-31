var models = require('../models'); // loads index.js
const Order = models.order;
const Category = models.category;

module.exports = {
    create: function (req, res) {
        // Validate request
        var errors = {};
        if (!req.body.contact_name) {
            errors.contact_name = "Contact name can not be empty!";
        }
        if (!req.body.contact_phone) {
            errors.contact_phone = "Contact phone can not be empty!";
        }
        if (!req.body.agency) {
            errors.agency = "Agency can not be empty!";
        }
        if (!req.body.company) {
            errors.company = "Company can not be empty!";
        }
        if (!req.body.deadline) {
            errors.deadline = "Deadline can not be empty!";
        }
        if (!req.body.category_id) {
            errors.category_id = "Category can not be empty!";
        }
        if (Object.keys(errors).length !== 0) {
            res.status(400).send({ errors: errors });
            return;
        }

        // Create a Order
        const obj = {
            contact_name: req.body.contact_name,
            contact_phone: req.body.contact_phone,
            agency: req.body.agency,
            company: req.body.company,
            deadline: req.body.deadline,
            category_id: req.body.category_id,
            description: req.body.description
        };

        // Save Order in the database
        Order.create(obj)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Order."
                });
            });
    },

    findAll: function (req, res) {
        let sort = [['id', 'desc']];
        if (req.query.field && req.query.direction) {
            if (req.query.field == 'category') {
                sort = [[Category, 'name', req.query.direction]];
            } else {
                sort = [[req.query.field, req.query.direction]];
            }
        }

        Order.findAll({ order: sort, include: [{ model: Category }] })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving orders."
                });
            });
    },

    findOne: function (req, res) {
        const id = req.params.id;

        Order.findOne({ where: { id: id }, include: [{ model: Category }] })
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Order with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Order with id=" + id
                });
            });
    },

    update: function (req, res) {
        const id = req.params.id;

        // Validate request
        var errors = {};
        if (!req.body.contact_name) {
            errors.contact_name = "Contact name can not be empty!";
        }
        if (!req.body.contact_phone) {
            errors.contact_phone = "Contact phone can not be empty!";
        }
        if (!req.body.agency) {
            errors.agency = "Agency can not be empty!";
        }
        if (!req.body.company) {
            errors.company = "Company can not be empty!";
        }
        if (!req.body.deadline) {
            errors.deadline = "Deadline can not be empty!";
        }
        if (!req.body.category_id) {
            errors.category_id = "Category can not be empty!";
        }
        if (Object.keys(errors).length !== 0) {
            res.status(400).send({ errors: errors });
            return;
        }

        // Create a Order
        const obj = {
            contact_name: req.body.contact_name,
            contact_phone: req.body.contact_phone,
            agency: req.body.agency,
            company: req.body.company,
            deadline: req.body.deadline,
            category_id: req.body.category_id,
            description: req.body.description
        };

        Order.update(obj, {
            where: { id: id }
        }).then(num => {
            let message = 'Order updated successfully.';
            if (num != 1) {
                message = 'Error updating Order.';
            }
            res.send({ message: message });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Order."
            });
        });
    },

    delete: function (req, res) {
        const id = req.params.id;

        Order.destroy({
            where: { id: id }
        }).then(num => {
            let message = 'Order updated successfully.';
            if (num != 1) {
                message = 'Error updating Order.';
            }
            res.send({ message: message });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Order."
            });
        });
    },

    deleteAll: function (req, res) {
        Order.destroy({
            where: {},
            truncate: false
        }).then(nums => {
            res.send({ message: `${nums} orders were deleted successfully!` });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all orders."
            });
        });
    }
}
