<template>
    <b-card class="">
        <b-img
            :src="require('../assets/Automatic_Logo.png')"
            alt="automatik logo"
            block
            center
            fluid
            width="350"
        ></b-img>

        <nav>
            <b-nav pills>
                <b-nav-item active>Create Account</b-nav-item>
                <b-nav-item>Create Profile</b-nav-item>
            </b-nav>
        </nav>

        <b-form class="w-75 mx-auto" @submit.prevent="register">
            <b-form-group
                label="Username"
                label-for="input-2"
                @submit.prevent="uniqueUsername"
            >
                <b-form-input
                    id="input-2"
                    v-model="username"
                    placeholder="Username"
                    required
                >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="password"
                    placeholder="Password"
                    required
                    type="password"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Confirm Password:" label-for="input_password">
                <b-form-input
                    id="input-2"
                    v-model="password"
                    placeholder="Confirm Password"
                    required
                    type="password"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Email:" label-for="input-3">
                <b-form-input
                    id="input-3"
                    v-model="email"
                    placeholder="jdoe@domain.com"
                    required
                >
                </b-form-input>
            </b-form-group>

            <b-form-group label="Confirm Email:" label-for="input-4">
                <b-form-input
                    id="input-4"
                    v-model="email"
                    placeholder="jdoe@domain.com"
                    required
                >
                </b-form-input>
            </b-form-group>
            <b-row>
                <b-col class="text-center">
                    <b-button size="lg" type="submit" variant="info"
                        >Register
                    </b-button>
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
            firstName: '',
            lastName: '',
            employeeId: '',
            positionTitle: '',
        };
    },
    methods: {
        register() {
            auth.register(
                this.firstName,
                this.lastName,
                this.employeeId,
                this.positionTitle,
                userExists => {
                    if (userExists) {
                        this.error = true;
                    } else {
                        this.$emit('auth');
                    }
                },
            );
        },
    },
};
</script>

<style lang="scss">
nav {
    padding: 4px;
    border: 2px solid lightgray;
}
</style>
