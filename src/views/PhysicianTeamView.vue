<template>
  <div class="col-12 col-sm-12 col-md-8 main">
    <article>
      <InfoBar/>
      <hr/>
      <EmergencyTeams/>
      <hr/>
      <CommitmentForm/>
      <span v-text="$store.getters.getCurrentPatient"></span>
      <hr>
      <transition name="fade">
        <div v-show="showOverlay" class="overlay"><div class="topOverlay"></div></div>
      </transition>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import InfoBar from "../components/otherComponents/InfoBar";
import EmergencyTeams from "../components/otherComponents/EmergencyTeams";
import CommitmentForm from "../components/otherComponents/CommitmentForm";

export default {
  name: "PhysicianTeamView",
  components: {
    CommitmentForm,
    EmergencyTeams,
    InfoBar
  },
  data () {
    return {
      showOverlay: false
    };
  },
  beforeMount () {
    const self = this;
    this.$root.apiSocket.on("medicationTime", ({ emergencyTeamsCompetentToDealWith, emergencyTeam }) => {
      self.$root.debug("ON -> medicationTime");
      if (emergencyTeam === "") {
        self.showOverlay = emergencyTeamsCompetentToDealWith.some((team) => team.name === self.$store.getters.getUsername);
      } else {
        self.showOverlay = emergencyTeam === self.$store.getters.getUsername;
      }
    });
    this.$root.apiSocket.on("clearMedicationTime", () => {
      self.$root.debug("ON -> clearMedicationTime");
      self.showOverlay = false;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.main {
    min-height: 100vh;
  }

  div.topOverlay {
    all: inherit;
    max-width: 66%;
    max-height: 77%;
    z-index: 1000;
    margin: auto;
    background-image: url('../assets/new-patient.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  div.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.88);
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
