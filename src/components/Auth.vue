<template>
    <div class="container">
        <h1 class="center">Login</h1>
        <div class="center">
            <button @click="socialLogin" class="social-button">
        <img alt="Google Logo" src="../assets/google-icon.png">
      </button>
        </div>
    </div>
</template>

<script>
// import { db } from "../main.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "Auth",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      str: null
    };
  },
  methods: {
      socialLogin() {
          const provider = new firebase.auth.GoogleAuthProvider()

          firebase.auth().signInWithPopup(provider).then((result) => {
              this.user = result.user
              this.$router.replace("/")
          }).catch((err) => {
            console.log('down');
            this.$router.replace("/unauth")
              console.log(err);
          })
      }
  }
};
</script>

<style scoped>
.container {
  width: 50%;
  margin: 0 auto
}
.center { display: flex; justify-content: center; }
 button {
    margin-top: 40px;
    width: 10%;
    cursor: pointer;
  }


.login {
  margin-bottom: 20px;
}
.social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .social-button img {
    width: 100%;
  }
</style>

