<template>
  <b-container class="h-100">
    <router-view v-on:auth="updateAuth"/>
  </b-container>
</template>

<script>
// Add Firebase products here
import 'firebase/auth';
import 'firebase/firestore';
import auth from './auth';

const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://PROJECT_ID.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
  measurementId: 'G-MEASUREMENT_ID',
};

export default {
  data() {
    return {
      loggedIn: auth.loggedIn(),
    };
  },
  methods: {
    updateAuth() {
      this.loggedIn = auth.loggedIn();
    },
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
