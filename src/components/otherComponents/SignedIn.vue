<template>
  <span>
    Signed in as <strong v-text="this.$store.getters.getUsername"></strong>.
  </span>
</template>

<script>
export default {
  name: "SignedIn"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span {
    float: left;
    user-select: none;
    width: 40%;
    padding: 1% 2%;
    letter-spacing: 0.1vmax;
  }

  span:hover {
    background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.4) 20%, #ff7878 60%, rgba(0, 0, 0, 0.4) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
