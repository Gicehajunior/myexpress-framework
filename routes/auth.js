const auth = (router) => {
    const multer = require('multer');
    const AuthController = require('@app/controllers/auth/AuthController');
    const WebController = require('@app/controllers/other/WebController');

    const upload = multer();

    // login routes
    router.get('/', WebController.index);
    router.get('/login', AuthController.login);
    router.post('/login', upload.none(), AuthController.authlogin); 

    // register routes
    router.get('/register', AuthController.register);
    router.post('/register', upload.none(), AuthController.authregister);

    // log out route
    router.get('/logout', AuthController.logout);
}

module.exports = auth;
