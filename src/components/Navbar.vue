<template>
  <div>
    <router-link to="/">
      <img id="logo" alt="Jayway" src="../assets/jayway3.png" width="130" />
    </router-link>
    <a class="topbar" v-if="user" @click="logOut">logga ut</a>
    <span class="topbar profil">
      <i class="material-icons add">person_outline</i>
      {{firstname}}
    </span>
    <a class="topbar" v-if="!user" @click="logOut">logga in</a>
    <a class="topbar" v-if="!user" @click="logOut">skapa konto</a>

    <div id="title" class="title">
      <h1>inköp halmstad</h1>
    </div>
    <div id="nav" class="nav">
      <router-link to="/">inköpslista</router-link> |
      <router-link to="/tips">maria tipsar</router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      firstname: null,
      email: null
    };
  },
  firestore() {
    return {};
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    });
  },
  updated() {
    let user = firebase.auth().currentUser;
    if (user) {
      let firstname = null;
      let str = user.email.split(".", 1);
      firstname = str[0];
      console.log(firstname);
      this.firstname = firstname;
    } else {
      console.log("ingen inloggad");
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 15px;
  margin-bottom: 200px;
}

#nav {
  text-align: left;
  width: 280px;
  margin: auto;
}

#nav a {
  font-weight: bold;
  font-size: 16px;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ff008c;
}

.title {
  text-align: left;
  width: 280px;
  margin: auto;
  font-size: 19px;
}

h1 {
  margin: 50px 0 10px 0;
}

.topbar {
  float: right;
  padding: 15px 30px;
  text-decoration: none;
  font-size: 1em;
  color: #2c3e50;
  font-weight: 500;
  cursor: pointer;
}


.topbar:hover {
  color: #ff008c;
}

.profil {
  padding-right: 0px;
}

.profil:hover {
  color: #2c3e50;
  cursor: auto;
}

</style>
