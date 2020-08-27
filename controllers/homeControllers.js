class homeController {
    static home(req, res) {
        // show book list
        res.render('home')
    }
}

module.exports = homeController;