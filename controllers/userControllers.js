const { Book, User,UserBook } = require('../models');
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const getDue = require('../helper/countDays');
const moment = require('moment');

class UserController {
    static viewBooks(req, res) {
        if (req.session.userId) {
            let err = req.app.locals.err
            delete req.app.locals.err
            Book.findAll({ where : { stock : { [Op.gte]: 1 } }})
            .then(data => {
                res.render('books-view', { data, err })
            })
            .catch(err => {
                console.log(err)
                res.send(err);
            })
        } else {
            res.redirect('/')
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
        const userid = req.session.userId;
        const bookId = req.params.bookId
        let pass;
        Book.findOne({ where : { id : bookId } })
            .then(data => {
                pass = data;
                return UserBook.findOne({
                    where : {
                        user_id : userid,
                        book_id : bookId
                    }
                })
            })
            .then(data => {
                if (data === null) {
                    res.render('checkout', { data : pass , userid })
                } else {
                    req.app.locals.err = 'you already rent this book, please choose different one.'
                    res.redirect('/user/views')
                }
            })
            .catch(err => {
                console.log(err)
                res.send(err);
            })
    }
    static checkoutPost(req, res) {
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
                return Book.findOne({ where : { id : bookId } })
            })
            .then(data => {
                let newstock = data.stock - 1;
                return Book.update({ stock : newstock },{ where : { id : bookId } })
            })
            .then(data => {
                res.redirect('/user/rented')
            })
            .catch(err => {
                console.log(err)
                res.send(err);
            })
    }
    static findAllRent(req, res) {
        // borrowed book list
        UserBook.findAll({ 
            where : { 
                user_id : req.session.userId,
                status : 'outgoing'
            },
            include : [Book, User]
            })
            .then(data => {
                res.render('books-rented', { data })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static return(req, res) {
        // returning book, change status to pending
        const id = req.params.userbookId
        UserBook.update({ status : 'returned'},{ where : { id : id }})
            .then(data => {
                res.redirect('/user/rented')
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }
    static logout(req, res) {
        delete req.session.userId;
        res.redirect('/')
    }
}

module.exports = UserController;