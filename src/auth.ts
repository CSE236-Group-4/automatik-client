import firebase from 'firebase';

export default {
    login(email: string, password: string, callback: Function): void {
        if (localStorage.token) {
            if (callback) callback(true);
            return;
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(data => {
                    if (data.user?.uid) {
                        localStorage.token = data.user.refreshToken;
                        localStorage.userId = data.user.uid;
                    }
                    if (callback) callback(true);
                })
                .catch(error => {
                    console.error(error);
                    if (callback) callback(false);
                });
        }
    },

    logout(callback?: Function) {
        delete localStorage.token;
        delete localStorage.userId;
        if (callback) callback();
    },

    getToken(): string {
        return localStorage.token;
    },

    getUser(): string {
        return localStorage.userId;
    },

    loggedIn(): boolean {
        return !!localStorage.token;
    },
};
