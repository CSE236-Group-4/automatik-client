<template>
    <b-card class="">
        <b-img center :src="require('../assets/Automatic_Logo.png')" fluid alt="automatik logo"></b-img>
        <b-alert :show="error" variant="danger">Login credentials do not match</b-alert>
        <b-form @submit.prevent="login" class="w-75 mx-auto">
            <b-form-group label="Employee Id:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="employeeId"
                    placeholder="employee id"
                    required
                >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="password"
                    placeholder="password"
                    type="password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-row>
                <b-col class="text-center">
                    <b-button type="submit" size="lg" variant="info">Login</b-button>
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
            employeeId: '',
            password: '',
            error: false,
        };
    },
    methods: {
        login() {
            auth.login(this.employeeId, this.password, loggedIn => {
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