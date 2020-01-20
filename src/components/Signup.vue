<template>
    <div class="signup">
        <a href="/">
        <img id="logo" alt="Jayway" src="../assets/jayway3.png" width="130" />
        <router-link class="topbar" :to="{ name:'Login' }">logga in</router-link>
    </a>

    <form class="inputArea" @submit.prevent="signup(email, password)">
      <h1 class="login">Skapa konto</h1>
      <div>
        <input class="input" type="email" name="email" placeholder="epost" v-model="email" />
      </div>
      <div>
        <input
          class="input"
          type="password"
          name="password"
          placeholder="lösenord"
          v-model="password"
        />
      </div>
      <p class="feedback" v-if="feedback">{{ feedback }}</p>
      <div class="field">
        <button>skapa konto</button>
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
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      str: null
    };
  },
  methods: {
    // setName() {
    //     let str = null
    //     let email = "fia.pia"
    //     str = email.split('.',1).toString()
    //     this.feedback = str
    // },
    signup(email, password) {
      if (this.email && this.password) {
        let ref = db.collection("users").doc(this.email);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "kontot finns redan";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .catch(err => {
                console.log(err);
                this.feedback = "för svagt lösenord, försök igen";
              })
              .then(cred => {
                let [str] = email.split(". || ", 1);
                ref.set({
                  email: this.email,
                  firstname: str
                });
                console.log(cred.user.email);
              })

              .then(() => {
                this.$router.push({ name: "Lista" });
              });
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

