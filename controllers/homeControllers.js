const { Admin } = require('../models')

class homeController {
    static home(req, res) {
        // show book list
        console.log(req.session)
        res.render('home')
    }

    static registerAdminForm(req, res) {
        res.render('registerAdmin')
    }

    static registerAdminPost(req, res) {
        const { name, email, password } = req.body
        Admin.create({
            name, email, password
        })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = homeController;