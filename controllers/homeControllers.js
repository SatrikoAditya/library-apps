class homeController {
    static home(req, res) {
        // show book list
        console.log(req.session)
        res.render('home')
    }
}

module.exports = homeController;