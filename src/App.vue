<template>
  <div class="app">
    <div class="row sticky-header">
      <Header/>
    </div>
    <div class="row">
      <BannerLeft/>
      <transition name="fade">
        <router-view/>
      </transition>
      <BannerRight/>
    </div>
    <div class="row sticky-footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import BannerLeft from "./components/BannerLeft";
import BannerRight from "./components/BannerRight";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    BannerLeft,
    BannerRight,
    Footer
  },
  async beforeCreate () {
    const self = this;
    [this.$root.authSocket, this.$root.apiSocket].forEach((socket) => {
      socket.on("disconnect", async () => {
        let timerID = setTimeout(async function onDisconnect () {
          try {
            /**
             * PROBLEM:
             * A user has been logged out and the corresponding session destroyed. Server restarts.
             * WS reconnects automatically w/o reloading the entire page, but the session data is not being shared anymore.
             *
             * SOLUTION:
             * A dummy HTTP request needs to be sent in order to share session data with socket.io after the server restart.
             * unsetSession removes session record from the database, while there needs to be one
             * before socket.io reconnects again after restart.
             *
             * Another solution is to open socket.io connection after the first HTTP request has been sent.
             * The problem is WHEN... (w/o reloading the entire page obviously)
             */
            const result = await fetch("/auth/isAuthenticated");
            const [{ isAuthenticated, status, message, role, username }] = await result.json();
            self.$store.commit("authenticate", { isAuthenticated, status, message, role, username });
            if (!isAuthenticated) {
              self.$store.commit("resetVisibleTeam");
              self.$store.commit("resetCurrentPatient");
            }

            /**
             * Unset timer if the promise above has been resolved.
             */
            clearTimeout(timerID);

            /**
             * The underlying connection is still OPEN if the socket has been disconnected due to another login attempt
             * on the same account. On the other hand if the server has been restarted, a new connection will be established.
             */
            socket.connect();
          } catch (err) {
            console.error("Server is not responding...");
            timerID = setTimeout(onDisconnect, 5000);
          }
        }, 5000);
      });
    });

    const result = await fetch("/auth/isAuthenticated");
    const [{ isAuthenticated, status, message, role, username }] = await result.json();
    this.$store.commit("authenticate", { isAuthenticated, status, message, role, username });
    if (!isAuthenticated) {
      this.$store.commit("resetVisibleTeam");
      this.$store.commit("resetCurrentPatient");
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated;
    }
  },
  watch: {
    isAuthenticated () {
      if (this.$store.getters.isAuthenticated === true) {
        this.$router.push(`/${this.$store.getters.getRole}/${this.$store.getters.getUsername}`);
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style>
  body {
    background-image: url('assets/hexellence.png');
    font-family: 'Acme', sans-serif;
    color: maroon;
    overflow-x: hidden;
  }

  div.sticky-header {
    position: sticky !important;
    top: 0 !important;
    z-index: 100 !important;
  }

  div.sticky-footer {
    position: sticky !important;
    bottom: 0 !important;
    z-index: 100 !important;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
