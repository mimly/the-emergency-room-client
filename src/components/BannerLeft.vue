<template>
  <div class="col-0 col-sm-0 col-md-2" @mouseover="showImage" ref="banner">
    <div v-for="(img, index) in images" :key="index">
      <transition name="bounce">
        <img v-show="selectedImage === index" alt="NO ADS" :src="img" :class="classObject"/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerLeft",
  data () {
    return {
      images: [
        "./banners/1.jpg",
        "./banners/2.png",
        "./banners/3.gif",
        "./banners/4.jpg",
        "./banners/5.jpg",
        "./banners/6.png",
        "./banners/7.gif",
        "./banners/8.gif",
        "./banners/9.gif",
        "./banners/10.gif",
        "./banners/11.gif",
        "./banners/12.gif",
        "./banners/13.gif",
        "./banners/14.gif",
        "./banners/15.gif",
        "./banners/15.gif",
        "./banners/16.gif",
        "./banners/17.gif",
        "./banners/18.gif",
        "./banners/19.gif",
        "./banners/20.gif",
        "./banners/21.gif",
        "./banners/22.gif",
        "./banners/23.gif",
        "./banners/24.gif",
        "./banners/25.gif",
        "./banners/26.gif",
        "./banners/27.gif",
        "./banners/28.jpg",
        "./banners/29.jpg",
        "./banners/30.jpg",
        "./banners/31.gif"
      ],
      selectedImage: undefined,
      classObject: undefined,
      timeout: undefined
    };
  },
  methods: {
    showImage () {
      const self = this;
      clearTimeout(this.timeout);
      this.selectedImage = this.randomImage();
      this.classObject = this.randomClass();
      this.timeout = setTimeout(() => {
        self.selectedImage = undefined;
      }, 8000);
    },
    randomImage () {
      return Math.floor(Math.random() * this.images.length);
    },
    randomClass () {
      return Math.floor(Math.random() * 2) === 0 ? "top" : "bottom";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    width: 24vw;
    position: fixed !important;
    left: 0 !important;
    z-index: 101 !important;
    pointer-events: none;
    opacity: 0.4;
    text-align: center;
  }

  img.top {
    top: 10.4vh !important;
  }

  img.bottom {
    bottom: 5.4vh !important;
  }

  .bounce-enter-active {
    animation: bounce-in 4s;
  }

  .bounce-leave-active {
    animation: bounce-in 4s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
