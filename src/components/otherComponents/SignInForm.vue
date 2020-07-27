<template>
  <form @submit.prevent="signIn">
    <input v-model="username" required minlength="4" maxlength="32" type="text" placeholder="Username: " /><br />
    <input v-model="password" required minlength="4" maxlength="32" type="password" placeholder="Password: " /><br />
    <br />
    <input type="submit" value="Sign in" />
  </form>
</template>

<script>
export default {
  name: "LoginPage",
  data () {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async signIn () {
      /**
       * Sync session after the session cookie has expired. Otherwise the page reload is required.
       */
      // this.$root.authSocket.disconnect(false);
      // this.$root.apiSocket.disconnect(false);

      const result = await fetch("/auth/setSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      const [{ isAuthenticated, status, message, role, username }] = await result.json();
      this.$store.commit("authenticate", { isAuthenticated, status, message, role, username });
      if (!isAuthenticated) {
        this.$store.commit("resetVisibleTeam");
        this.$store.commit("resetCurrentPatient");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span {
    color: maroon;
  }

  form {
    margin-top: 8%;
  }

  input[type=submit],
  input[type=text],
  input[type=password] {
    margin-left: 8%;
  }

  input[type=submit] {
    cursor: pointer;
    width: 22%;
    background-image: linear-gradient(to bottom right, #600 20%, #900 60%, #000 100%);
    color: white;
    letter-spacing: 0.2vmax;
    font-size: 1.2vmax;
    margin-top: 4%;
    padding: 0.8%;
    border: none;
    border-radius: 0.2em;
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
  }

  input[type=text],
  input[type=password] {
    width: 22%;
    background-color: #efefef;
    color: #f33737;
    letter-spacing: 0.2vmax;
    font-size: 1.2vmax;
    margin-top: 1%;
    padding: 0.8%;
    border: 0.1em solid #ddd;
    border-radius: 0.2em;
    opacity: 0.8;
  }

  input[type=submit]:hover {
    background-image: linear-gradient(to bottom right, #900 20%, #ff7878 60%, #600 100%);
  }

  input[type=text]:hover,
  input[type=password]:hover {
    opacity: 1;
  }

  input[type=submit]:focus {
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
  }

  input[type=text]:focus,
  input[type=password]:focus {
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
    border: 0.1em solid #900;
    background-color: #fcc;
  }

  ::placeholder {
    opacity: 0.5;
  }
</style>
