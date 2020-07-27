<template>
  <div class="col-12">
    <header>
      <span v-html="header"></span>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data () {
    return {
      header: "&#x271A; EMERGENCY ROOM &#x271A;"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (orientation: portrait) {
    div.col-12 {
      font-size: 2.4vh !important;
      letter-spacing: 0.6vh !important;
    }
  }

  @media screen and (orientation: landscape) {
    div.col-12 {
      font-size: 4.8vh !important;
      letter-spacing: 1.2vh !important;
    }
  }

  div.col-12 {
    user-select: none;
    background-image: linear-gradient(to bottom right, #600 20%, #900 60%, #000 100%);
    color: white;
    text-align: center;
    padding-top: 1.4vh !important;
    padding-bottom: 1.4vh !important;
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
  }
</style>
