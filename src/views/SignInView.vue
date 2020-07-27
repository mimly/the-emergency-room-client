<template>
  <div class="col-12 col-sm-12 col-md-8 main">
    <article>
      <SignInForm/>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import SignInForm from "../components/otherComponents/SignInForm";

export default {
  name: "SignInView",
  components: {
    SignInForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.main {
    min-height: 100vh;
    background-image: url('../assets/sign-in.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
</style>
