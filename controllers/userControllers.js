const { Book, User } = require('../models');
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

class UserController {
    static viewBooks(req, res) {
        Book.findAll({ where : { stock : { [Op.gte]: 1 } }})
            .then(data => {
                res.render('books-view', { data })
            })
            .catch(err => {
                console.log(err)
                res.send(err);
            })
        
    }
    static loginForm(req, res) {
        // login form
        let err = req.app.locals.err;
        res.render('login', { err })
    }
    static loginPost(req, res) {
        // req.body
        const email = req.body.user_email.toLowerCase();
        const password = req.body.user_password;
        console.log(email, password)
    }
    static checkoutForm(req, res) {
        // checkout form
    }
    static checkoutPost(req, res) {
        // req.body
    }
    static findAllBorrowed(req, res) {
        // borrowed book list
    }
    static return(req, res) {
        // returning book, change status to pending
    }
}

module.exports = UserController;