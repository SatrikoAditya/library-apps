const { Book } = require('../models')

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
        const { title, author, genre, stock } = req.body
        Book.create({
            title, author, genre, stock
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
        const { title, author, genre, stock } = req.body
        const id = req.params.id
        Book.update({
            title, author, genre, stock
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
}
module.exports = AdminControllers