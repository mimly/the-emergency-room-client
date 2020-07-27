<template>
  <span>
    <button @click="signOut">Sign out</button>
  </span>
</template>

<script>
export default {
  name: "SignOut",
  methods: {
    async signOut () {
      if (this.$store.getters.getRole === "triageNurse") {
        this.$root.apiSocket.emit("clearMedicationTime");
      }

      const result = await fetch("/auth/unsetSession", {
        method: "PUT"
      });
      await result.json();
      this.$store.commit("invalidate");
      this.$store.commit("resetVisibleTeam");
      this.$store.commit("resetCurrentPatient");
    }
  },
  beforeCreate () {
    const self = this;
    this.$root.authSocket.on("signOut", () => {
      self.$root.debug("ON -> signOut");
      self.$store.commit("invalidate");
      self.$store.commit("resetVisibleTeam");
      self.$store.commit("resetCurrentPatient");
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span {
    float: right;
    user-select: none;
    width: 20%;
    padding: 1% 2%;
  }

  button {
    cursor: pointer;
    background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.8) 20%, antiquewhite 60%, rgba(0, 0, 0, 0.8) 100%);
    color: antiquewhite;
    width: 100%;
    letter-spacing: 0.1vmax;
    font-size: 1.2vmax;
    padding: 0.8%;
    border: none;
    border-radius: 0.2em;
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
  }

  button:hover {
    background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.4) 20%, #ff7878 60%, rgba(0, 0, 0, 0.4) 100%);
  }

  button:focus {
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
  }
</style>
