<template>
  <div class="login">
    <a href="/">
      <img id="logo" alt="Jayway" src="../assets/jayway3.png" width="130" />
      <router-link class="topbar" :to="{ name:'Signup' }">skapa konto</router-link>
    </a>
    <form class="inputArea" @submit.prevent="login(email, password)">
      <h1 class="login">Logga in</h1>
      <div>
        <input class="input" type="email" name="Email" placeholder="epost" v-model="email" />
      </div>
      <div>
        <input
          class="input"
          type="Password"
          name="Password"
          placeholder="lösenord"
          v-model="password"
        />
      </div>
      <p class="feedback" v-if="feedback">{{ feedback }}</p>
      <div class="field">
        <button>logga in</button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../main.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
      };
  },
  methods: {
    login(email, password) {
      if (this.email && this.password) {
        let ref = db.collection("users").doc(this.email);
        ref.get().then(doc => {
          if (doc.exists) {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .catch(err => {
                console.log(err);
                this.feedback = "fel lösenord, testa igen";
              })
              .then(cred => {
                console.log(cred.user.email);
                this.$router.push({ name: "Lista" });
              });
          } else {
            this.feedback = "kontot finns inte, skapa gärna ett";
          }
        });
      } else {
        this.feedback = "skriv i mail och lösenord först";
      }
    }
  }
};
</script>

<style scoped>
button {
  color: #ff008c;
  padding: 10px;
  margin-top: 20px;
  font-size: 1em;
  border: 2px solid #ff008c;
  letter-spacing: 0.04em;
}

button:hover {
  color: #2c3e50;
  border: 2px solid #2c3e50;
}

.login {
  margin-bottom: 20px;
}

.feedback {
  color: #ff008c;
  margin: 0px;
  font-weight: 700;
  font-size: 0.9em;
}
</style>

