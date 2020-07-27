<template>
  <div class="col-12">
    <footer>
      <span class="align-left" v-text="$store.getters.getMessage"></span>
      <span class="align-right" v-html="footer"></span>
      <div class="clear-both"></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data () {
    return {
      footer: "&copy; Cuckoo's Nest Hospital"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (orientation: portrait) {
    div.col-12 {
      font-size: 1.2vh !important;
      letter-spacing: 0.3vh !important;
    }
  }

  @media screen and (orientation: landscape) {
    div.col-12 {
      font-size: 2.4vh !important;
      letter-spacing: 0.6vh !important;
    }
  }

  div.col-12 {
    user-select: none;
    background-image: linear-gradient(to bottom right, #600 20%, #900 60%, #000 100%);
    color: white;
    padding-top: 0.8vh !important;
    padding-bottom: 0.8vh !important;
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
  }

  span.align-left {
    float: left;
    padding-left: 2%;
  }

  span.align-right {
    float: right;
    padding-right: 6%;
  }

  div.clear-both {
    clear: both;
  }
</style>
