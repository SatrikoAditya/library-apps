const { Book, User } = require('../models')

class AdminControllers {
    static show(req, res) {
        Book.findAll({
            order : [
                ['title', 'ASC']
            ]
        })
        .then(data => {
            res.render('admin/list-book', { data })
        })
        .catch(err => {
            res.send(err)
        }) 
    }

    static addForm(req, res) {
        res.render('admin/add-book')
    }

    static addPost(req, res) {
        const { title, author, genre, stock, desc, img } = req.body
        Book.create({
            title, author, genre, stock, desc, img
        })
        .then(result => {
            res.redirect('/admin/list-books')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res) {
        const id = req.params.id
        Book.destroy({
            where : {
                id
            }
        })
        .then(result => {
            res.redirect('/admin/list-books')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editForm(req, res) {
        const id = req.params.id
        Book.findByPk(id)
        .then(data => {
            res.render('admin/edit-book', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editPost(req, res) {
        const { title, author, genre, stock, desc, img } = req.body
        const id = req.params.id
        Book.update({
            title, author, genre, stock, desc, img
        }, {
            where : {
                id
            }
        })
        .then(result => {
            res.redirect('/admin/list-books')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static registerForm(req, res) {
        res.render('admin/register')
    }

    static registerPost(req, res) {
        const { first_name, last_name, email, password, phone_number, address } = req.body
        User.create({
            first_name, last_name, email, password, phone_number, address
        })
        .then(result => {
            res.redirect('/admin/list-books')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static listUser(req, res) {
        User.findAll({
            order : [
                ['first_name', 'ASC']
            ]
        })
        .then(data => {
            res.render('admin/list-user', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteUser(req, res) {
        const id = req.params.id
        User.destroy({
            where : {
                id
            }
        })
        .then(result => {
            res.redirect('/admin/list-users')
        })
        .catch(err => {
            res.send(err)
        })
    }
}
module.exports = AdminControllers