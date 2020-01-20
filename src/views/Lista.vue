<template>
  <div id="Lista">
    <Navbar />
    <div class="list">
      <li class="listItem" v-for="(jtask, index) in jtasks" :key="index">
        <span class="listText">{{jtask.item}}</span>
        <button @click="deleteTask(jtask.id)">
          <i class="material-icons icon delete">delete_outline</i>
        </button>
        <br />
        <span class="dateName">  {{ new Date(jtask.timestamp).toLocaleDateString() }} | {{ jtask.firstname }}</span>
        <!-- <button @click="editTask(jtask.id)">
          <i class="material-icons-outlined icon">edit</i>
        </button>-->
      </li>
    </div>
    <div>
      <form class="inputArea" @submit.prevent="addTask(item)">
        <input class="input" @mouseover="fNull()" v-model="item" label="Lägg till" placeholder="Inköp" />
        <p class="feedback" v-if="feedback">{{ feedback }}</p>
        <button class="laggTill" type="submit">
          <i class="material-icons add">add_circle</i>
          lägg till
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../main.js";
import Navbar from "../components/Navbar";

export default {
  name: "Lista",
  components: {
    Navbar
  },
  data() {
    return {
      jtasks: [],
      item: '',
      user: '',
      timestamp: null,
      hover: false,
      users: [],
      firstname: '',
      feedback: '',
      email: ''
    };
  },
  firestore() {
    return {
      jtasks: db.collection("jtasks").orderBy("timestamp"),
      users: db.collection("users")
    };
  },

  methods: {
    addTask(item) {
      if (item) {
        var user = firebase.auth().currentUser;
        var email;
        var firstname;
        var str = user.email.split(".", 1);
        var timestamp = new Date().toISOString();

        email = user.email;
        firstname = str[0];

        db.collection("jtasks").add({ item, email, firstname, timestamp });
        
        this.item = '';
        this.user = '';
        this.timestamp = '';
        
      } else {
        this.feedback = "du behöver skriva i en vara först";
      }
    },
    deleteTask(id) {
      db.collection("jtasks")
        .doc(id)
        .delete();
    },
    fNull() {
      this.feedback = null;
    }
  },
  updated() {
    let user = firebase.auth().currentUser;
    if (user) {
      let firstname = null;
      let str = user.email.split(".", 1);
      firstname = str[0];
      this.firstname = firstname;
    } else {
      console.log("ingen inloggad");
    }
  }
};
</script>

<style>
.profil {
  padding-top: 7px;
}

input {
  outline: none;
}

button {
  background-color: transparent;
  border: 0px solid #2c3e50;
  font-size: 20px;
  padding: 0;
  color: #ff008c;
  outline: none;
}

.inputArea {
  margin: auto;
  margin-top: 60px;
  width: 280px;
}

.laggTill {
  text-align: left;
  font-size: 1.3em;
  margin-top: 5px;
  color: #ff008c;
}

.laggTill:hover {
  color: #2c3e50;
}

.input {
  text-align: left;
  border: none;
  border-bottom: solid #ff008c 1px;
  margin: 0px 20px 10px 0;
  font-size: 1.3em;
  font-family: "Avenir";
  color: #2c3e50;
  font-weight: regular;
  width: 300px;
}

input:hover {
  border-bottom: solid #ff008c 2px;
}

.listItem {
  text-align: left;
  list-style-position: outside;
  margin-top: 12px;
}

.dateName {
  font-size: 0.8em;
  color: #b7b7b7;
  padding-left: 22px;
}

.icon:hover {
  color: #ff008c;
}

.add {
  color: inherit;
  top: 6px;
  padding: 0 6px 0 0;
}

.delete {
  top: 3px;
  color: #f0f0f0;
}

[class^="material"] {
  font-size: 24px;
  position: relative;
  text-align: right;
}

.list {
  width: 280px;
  margin: auto;
  margin-top: 70px;
}

.listText {
  font-weight: bold;
  font-size: 1.4em;
  padding-right: 10px;
}

::placeholder {
  color: #b7b7b7;
}

.feedback {
  color: #ff008c;
  margin: 0px;
  font-weight: 700;
  font-size: 0.9em;
}
</style>
