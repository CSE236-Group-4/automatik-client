import axios from 'axios';

export default {
    login(employeeId: string, password: string, callback: Function) {
        if (localStorage.token) {
            if (callback) callback(true);
            return;
        }
        // Temp logic for testing
        localStorage.token = 'faketokenidhere';
        localStorage.userId = '12345';
        if (callback) callback(true);
        /* Backend required
        axios
            .post('/users/login', { employeeId: employeeId, password: password })
            .then(res => {
                if (res.data.token) {
                    localStorage.token = res.data.token;
                    localStorage.userId = res.data.user._id;
                    if (callback) callback(true);
                } else {
                    if (callback) callback(false);
                }
            })
            .catch(error => {
                if (callback) callback(false);
            });
            */
    },

    getToken() {
        return localStorage.token;
    },

    getUser() {
        return localStorage.userId;
    },

    logout(callback?: Function) {
        delete localStorage.token;
        delete localStorage.userId;
        if (callback) callback();
        /* Backend required
        axios
            .post(
                '/users/logout',
                {},
                {
                    headers: {
                        authorization: `Bearer ${this.getToken()}`,
                    },
                },
            )
            .then(res => {
                delete localStorage.token;
                delete localStorage.userId;
                if (callback) callback();
            })
            .catch(error => {
                console.log('error');
                if (callback) callback();
            });
            */
    },

    loggedIn() {
         return !!localStorage.token;
    },
};