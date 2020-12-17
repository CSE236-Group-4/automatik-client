<template>
    <b-container class="h-100">
        <router-view />
    </b-container>
</template>

<script>
import auth from './auth';

export default {
    data() {
        return {
            loggedIn: auth.loggedIn(),
        };
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
