<template>
  <div class="col-12 col-sm-12 col-md-8 main">
    <article>
      <InfoBar/>
      <hr/>
      <EmergencyTeams/>
      <hr/>
      <PersonalForm/>
      <hr>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import InfoBar from "../components/otherComponents/InfoBar";
import EmergencyTeams from "../components/otherComponents/EmergencyTeams";
import PersonalForm from "../components/otherComponents/PersonalForm";

export default {
  name: "TriageNurseView",
  components: {
    PersonalForm,
    EmergencyTeams,
    InfoBar
  },
  computed: {
    emergencyTeamsCompetentToDealWith: {
      get () { return this.$store.getters.getEmergencyTeamsCompetentToDealWith; }
    },
    emergencyTeam: {
      get () { return this.$store.getters.getCurrentPatient.emergencyTeam; }
    }
  },
  watch: {
    emergencyTeamsCompetentToDealWith (newValue) {
      this.$store.commit("updateCurrentPatientEmergencyTeam", "");
      this.$root.apiSocket.emit("medicationTime", {
        emergencyTeamsCompetentToDealWith: newValue,
        emergencyTeam: this.$store.getters.getCurrentPatient.emergencyTeam
      });
      this.$root.debug("EMIT -> medicationTime");
    },
    emergencyTeam (newValue) {
      this.$root.apiSocket.emit("medicationTime", {
        emergencyTeamsCompetentToDealWith: this.$store.getters.getEmergencyTeamsCompetentToDealWith,
        emergencyTeam: newValue
      });
      this.$root.debug("EMIT -> medicationTime");
    }
  },
  beforeMount () {
    const self = this;
    this.$root.apiSocket.on("isMedicationTime", () => {
      self.$root.debug("ON -> isMedicationTime");
      self.$root.apiSocket.emit("medicationTime", {
        emergencyTeamsCompetentToDealWith: self.$store.getters.getEmergencyTeamsCompetentToDealWith,
        emergencyTeam: self.$store.getters.getCurrentPatient.emergencyTeam
      });
      self.$root.debug("EMIT -> medicationTime");
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.main {
    min-height: 100vh;
  }
</style>
