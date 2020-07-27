<template>
  <div class="info-bar">
    <SignedIn/>
    <Time/>
    <SignOut/>
    <div class="clear-both"></div>
  </div>
</template>

<script>
import SignedIn from "./SignedIn";
import Time from "./Time";
import SignOut from "./SignOut";

export default {
  name: "InfoBar",
  components: {
    SignOut,
    Time,
    SignedIn
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.info-bar {
    overflow: hidden;
    background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.6) 20%, rgba(0, 0, 0, 0.8) 60%, black 100%);
    color: antiquewhite;
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
    border: none;
    border-radius: 0.2em;

    /* color: maroon; */
    font-size: 1.2vmax;
    padding: 0.8%;
  }

  div.clear-both {
    clear: both;
  }
</style>
