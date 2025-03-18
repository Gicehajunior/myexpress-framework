class Auth {
    constructor() {
        // 
    }

    register() {
        let registerBtn = document.querySelector(".register-btn");
        let registerForm = document.querySelector(".register-user-form");
        if (documentContains(registerBtn)) {
            registerBtn = cloneNodeElement(registerBtn);
            registerBtn.addEventListener('click', event => {
                event.preventDefault();
                registerBtn.disabled = true;
                __append_html('Please Wait...', registerBtn);

                if (!documentContains(registerForm)) {
                    toast('error', 5000, 'Oops, an error occurred!');
                    return;
                }
                
                const data = new FormData(registerForm);

                console.log(data);

                $.ajax({
                    type: registerForm.getAttribute('method'),
                    url: registerForm.getAttribute('action'),
                    data: data,
                    dataType: 'json', 
                    contentType: false,
                    processData: false,
                    success: function (res) { 
                        registerBtn.disabled = false;
                        __append_html('Register', registerBtn);
                        
                        if (res && res.message) {
                            toast(res.status, 8000, res.message);
                        }

                        if (res && res.redirectUrl) {
                            route(res.redirectUrl);
                        }
                    },
                    error: error => {
                        registerBtn.disabled = false;
                        __append_html('Register', registerBtn);
                        error = JSON.parse(error.responseText) || error;
                        console.log(`Ajax Error: ${error.message || JSON.parse(error.responseText) || JSON.stringify(error)}`);
                        toast('error', 8000, error.message || 'An error occurred. Please try again!');
                    }
                });
            });
        }
    }

    login() {
        let loginBtn = document.querySelector(".login-btn");
        let loginForm = document.querySelector(".login-user-form");
        if (documentContains(loginBtn)) {
            loginBtn = cloneNodeElement(loginBtn);
            loginBtn.addEventListener('click', event => {
                event.preventDefault();
                loginBtn.disabled = true;
                __append_html('Please Wait...', loginBtn);

                if (!documentContains(loginForm)) {
                    toast('error', 5000, 'Oops, an error occurred!');
                    return;
                }
                
                const data = new FormData(loginForm);

                console.log(data);

                $.ajax({
                    type: loginForm.getAttribute('method'),
                    url: loginForm.getAttribute('action'),
                    data: data,
                    dataType: 'json', 
                    contentType: false,
                    processData: false,
                    success: function (res) { 
                        loginBtn.disabled = false;
                        __append_html('Login', loginBtn);

                        if (res && res.redirectUrl) {  
                            route(res.redirectUrl);
                        }
                    },
                    error: error => {
                        loginBtn.disabled = false;
                        __append_html('Login', loginBtn);
                        error = JSON.parse(error.responseText) || error;
                        console.log(`Ajax Error: ${error.message || JSON.parse(error.responseText) || JSON.stringify(error)}`);
                        toast('error', 8000, error.message || 'An error occurred. Please try again!');
                    }
                });
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const authInstance = new Auth();
    authInstance.register();
    authInstance.login();
});