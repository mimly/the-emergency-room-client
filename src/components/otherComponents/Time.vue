<template>
  <span>
    <strong v-text="currentTime"></strong>
  </span>
</template>

<script>
export default {
  name: "Time",
  data () {
    return {
      currentTime: ""
    };
  },
  methods: {
    updateCurrentTime () {
      const today = new Date();

      let day = today.getDate();
      if (day < 10) day = `0${day}`;
      let month = today.getMonth() + 1;
      if (month < 10) month = `0${month}`;
      const year = today.getFullYear();

      let hour = today.getHours();
      if (hour < 10) hour = `0${hour}`;
      let minute = today.getMinutes();
      if (minute < 10) minute = `0${minute}`;
      let second = today.getSeconds();
      if (second < 10) second = `0${second}`;

      this.currentTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      setTimeout(this.updateCurrentTime, 1000);
    }
  },
  beforeMount () {
    this.updateCurrentTime();
  }
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
