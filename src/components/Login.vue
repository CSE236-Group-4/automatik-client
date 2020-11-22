<template>
    <b-card class="">
        <b-img center :src="require('../assets/Automatic_Logo.png')" fluid alt="automatik logo"></b-img>
        <b-alert :show="error" variant="danger">Login credentials do not match</b-alert>
        <b-form @submit.prevent="login" class="w-75 mx-auto">
            <b-form-group label="Username:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="username"
                    placeholder="Username"
                    required
                >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="Password"
                    placeholder="Password"
                    type="password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-row>
                <b-col class="text-center">
                    <b-button type="submit" size="lg" variant="info">Login</b-button>
                </b-col>
                <b-col class="text-center">
                    <b-button to="/register" size="lg" variant="info">Register</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-card>
</template>

<script>
import auth from '../auth';
export default {
    data() {
        return {
            userName: '',
            password: '',
            error: false,
        };
    },
    methods: {
        login() {
            auth.login(this.userName, this.password, loggedIn => {
                if (!loggedIn) {
                    this.error = true;
                } else {
                    this.$emit('auth');
                    this.$router.replace(this.$route.query.redirect || '/');
                }
            });
        },
    },
};
</script>

<style>
.error {
    color: red;
}
</style>
