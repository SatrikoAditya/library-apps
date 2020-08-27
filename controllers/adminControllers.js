const { Book, User, Admin, UserBook } = require('../models')

const bcrypt = require('bcryptjs');

class AdminControllers {
    static loginForm(req, res) {
        res.render('admin/login')
    }

    static loginPost(req, res) {
        const email = req.body.email
        const password = req.body.password
        Admin.findOne({
            where : {
                email
            }
        })
        .then(admin => {
            if(admin) {
                if(bcrypt.compareSync(password, admin.password)) {
                    req.session.adminId = admin.id 
                    res.redirect('/admin/list-books')
                    console.log(req.session)
                } else {
                    res.send('password salah')
                }
            } else {
                res.send('user not found')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

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
            first_name, 
            last_name, 
            email : email.toLowerCase(), 
            password, 
            phone_number, 
            address
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

    static listRentBook(req, res) {
        UserBook.findAll({
            where : {
                status: 'outgoing'
            },
            include : [User, Book]
        })
        .then(data => {
            res.render('admin/listRentBook', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static pending(req, res) {
        UserBook.findAll({
            where : {
                status: 'returned'
            },
            include: [User, Book]
        })
        .then(data => {
            
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req, res) {
        delete req.session.adminId
        res.redirect('/admin/login')
    }
}
module.exports = AdminControllers