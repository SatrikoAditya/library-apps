const { Book, User,UserBook } = require('../models');
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const getDue = require('../helper/countDays');

class UserController {
    static viewBooks(req, res) {
        if (req.session.userId) {
            Book.findAll({ where : { stock : { [Op.gte]: 1 } }})
            .then(data => {
                res.render('books-view', { data })
            })
            .catch(err => {
                console.log(err)
                res.send(err);
            })
        } else {
            res.redirect('/user/login')
        }
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
        User.findOne({
            where : { email : email }
        })
        .then(data => {
            if(bcrypt.compareSync(password, data.password)){
                req.session.userId = data.id;
                req.session.role = 'user';
                res.redirect('/user/views');
            } else {
                res.send('wrong password')
            }
        })
        .catch(err => {
            console.log(err)
            res.send('user not found');
        })
    }
    static checkoutForm(req, res) {
        // checkout form
        if(req.session.userId) {
            const userid = req.session.userId;
            const bookId = req.params.bookId
            Book.findOne({ where : { id : bookId } })
                .then(data => {
                    res.render('checkout', { data, userid })
                })
                .catch(err => {
                    console.log(err)
                    res.send(err);
                })
        } else {
            res.redirect('/user/login')
        }
    }
    static checkoutPost(req, res) {
        if (req.session.userId) {
            const userId = req.session.userId;
            const bookId = Number(req.params.bookId);
            const days = Number(req.body.num);
            const obj = {
                user_id : userId,
                book_id : bookId,
                status : 'outgoing',
                rent_date : new Date(),
                due_date : getDue(days)
            }
            UserBook.create(obj)
                .then(data => {
                    res.redirect('/user/rented')
                })
                .catch(err => {
                    console.log(err)
                    res.send(err);
                })
        }
    }
    static findAllRent(req, res) {
        // borrowed book list
        if(req.session.userId) {
            UserBook.findAll({ 
                where : { user_id : req.session.userId },
                include : [Book, User]
             })
                .then(data => {
                    res.render('books-rented', { data })
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
            
        } else {
            res.redirect('/user/login')
        }
    }
    static return(req, res) {
        // returning book, change status to pending
    }
}

module.exports = UserController;