const auth = (router) => {
    const AuthController = require('../app/controllers/auth/AuthController');

    // login routes
    router.get('/', AuthController.login);
    router.get('/login', AuthController.login);
    router.post('/login', AuthController.authlogin);

    // register routes
    router.get('/register', AuthController.register);
    router.post('/register', AuthController.authregister);
}

module.exports = auth;
