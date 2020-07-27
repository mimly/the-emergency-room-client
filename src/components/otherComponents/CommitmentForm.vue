<template>
  <fieldset>
    <legend><strong>Commitment form: </strong></legend>

    <form @submit.prevent="onSubmit" @reset="onReset" ref="commitmentForm">
      <div>
        <br/>
        <label for="drugs"><strong>Drugs: </strong></label>
        <br/>
        <select v-model="drugs" id="drugs" multiple required>
          <option value="" disabled selected hidden>Drugs: </option>
          <option v-for="{ ID, name } in $store.getters.getDrugs" :key="ID" :value="name" v-text="name"></option>
        </select>
      </div>

      <div>
        <br/>
        <label for="medicalProcedures"><strong>Medical procedures: </strong></label>
        <br/>
        <select v-model="medicalProcedures" id="medicalProcedures" multiple required>
          <option value="" disabled selected hidden>Medical procedures: </option>
          <option v-for="{ ID, name } in $store.getters.getMedicalProcedures" :key="ID" :value="name" v-text="name"></option>
        </select>
      </div>

      <div>
        <br/>
        <label for="outcome"><strong>Outcome: </strong></label>
        <br/>
        <select v-model="outcome" id="outcome" required>
          <option value="" disabled selected hidden>Outcome: </option>
          <option v-for="{ ID, name } in $store.getters.getOutcomes" :key="ID" :value="name" v-text="name"></option>
        </select>
      </div>

      <input type="submit" value="SUBMIT"/>
      <input type="reset" value="RESET"/>
    </form>

  </fieldset>
</template>

<script>
export default {
  name: "CommitmentForm",
  components: {},
  computed: {
    drugs: {
      get () { return this.$store.getters.getCurrentPatient.drugs; },
      set (value) { this.$store.commit("updateCurrentPatientDrugs", value); }
    },
    medicalProcedures: {
      get () { return this.$store.getters.getCurrentPatient.medicalProcedures; },
      set (value) { this.$store.commit("updateCurrentPatientMedicalProcedures", value); }
    },
    outcome: {
      get () { return this.$store.getters.getCurrentPatient.outcome; },
      set (value) { this.$store.commit("updateCurrentPatientOutcome", value); }
    },
    medicalIssue () {
      return this.$store.getters.getCurrentPatient.medicalIssue;
    }
  },
  watch: {
    async medicalIssue (newValue) {
      this.$store.commit("updateMedicalProcedures", await this.getMedicalProceduresFor(newValue));
    }
  },
  methods: {
    async getEmergencyTeams () {
      const result = await fetch("/api/emergency-teams");
      return await result.json();
    },
    async getPatientsFor (emergencyTeam) {
      const result = await fetch(`/api/emergency-teams/${emergencyTeam}/patients`);
      return await result.json();
    },
    async getEmergencyTeamsWithPatients () {
      const emergencyTeamsWithPatients = [];
      for (const emergencyTeam of JSON.parse(JSON.stringify(this.$store.getters.getEmergencyTeamsCompetentToDealWith))) {
        emergencyTeam.patients = await this.getPatientsFor(emergencyTeam.name);
        emergencyTeamsWithPatients.push(emergencyTeam);
      }
      return emergencyTeamsWithPatients;
    },
    getDrugs: async () => {
      const result = await fetch("/api/drugs");
      return await result.json();
    },
    getMedicalProcedures: async () => {
      const result = await fetch("/api/medical-procedures");
      return await result.json();
    },
    getOutcomes: async () => {
      const result = await fetch("/api/outcomes");
      return await result.json();
    },
    getMedicalProceduresFor: async (medicalIssue) => {
      const result = await fetch(`/api/medical-procedures/for/${medicalIssue}`);
      return await result.json();
    },
    async onSubmit () {
      const result = await fetch(`/api/patients/${this.$store.getters.getCurrentPatient.ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.$store.getters.getCurrentPatient)
      });
      await result.json();

      this.$refs.commitmentForm.reset();
    },
    async onReset () {
      this.$store.commit("resetCurrentPatient");
      this.$scrollTo("#et", 800, { easing: [0.6, 0.8, 0.3, 1.9], offset: -60 });
      this.$store.commit("updateEmergencyTeamsWithPatients", await this.getEmergencyTeamsWithPatients());
      const currentPatient = (this.$store.getters.getEmergencyTeamsWithPatients)[0].patients[0];
      this.$store.commit("updateCurrentPatientID", currentPatient.ID);
      this.$store.commit("updateCurrentPatientMedicalIssue", currentPatient.medicalIssue);
    }
  },
  async beforeMount () {
    this.$root.apiSocket.on("assignment", async () => {
      this.$root.debug("ON -> assignment");
      this.$store.commit("updateEmergencyTeamsWithPatients", await this.getEmergencyTeamsWithPatients());
      const currentPatient = (this.$store.getters.getEmergencyTeamsWithPatients)[0].patients[0];
      this.$store.commit("updateCurrentPatientID", currentPatient.ID);
      this.$store.commit("updateCurrentPatientMedicalIssue", currentPatient.medicalIssue);
      this.$store.commit("updateMedicalProcedures", await this.getMedicalProceduresFor(currentPatient.medicalIssue));
    });

    const self = this;
    this.$store.commit("updateEmergencyTeams", await this.getEmergencyTeams());
    this.$store.commit("updateEmergencyTeamsCompetentToDealWith", this.$store.getters.getEmergencyTeams.filter((x) => x.name === self.$store.getters.getUsername));
    this.$store.commit("updateEmergencyTeamsWithPatients", await this.getEmergencyTeamsWithPatients());
    const currentPatient = (this.$store.getters.getEmergencyTeamsWithPatients)[0].patients[0];
    this.$store.commit("updateCurrentPatientID", currentPatient.ID);
    this.$store.commit("updateCurrentPatientMedicalIssue", currentPatient.medicalIssue);
    this.$store.commit("updateDrugs", await this.getDrugs());
    this.$store.commit("updateMedicalProcedures", await this.getMedicalProceduresFor(currentPatient.medicalIssue));
    this.$store.commit("updateOutcomes", await this.getOutcomes());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  fieldset {
    margin-top: 4%;
    margin-bottom: 4%;
  }

  legend,
  label {
    user-select: none;
  }

  legend {
    font-size: 2vmax;
    letter-spacing: 0.2vmax;
  }

  label {
    font-size: 1.6vmax;
    letter-spacing: 0.1vmax;
  }

  input[type=submit],
  input[type=reset] {
    cursor: pointer;
    width: 18%;
    background-image: linear-gradient(to bottom right, #600 20%, #900 60%, #000 100%);
    color: white;
    letter-spacing: 0.2vmax;
    font-size: 1.2vmax;
    margin-top: 4%;
    margin-right: 1%;
    padding: 0.8%;
    border: none;
    border-radius: 0.2em;
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
  }

  select {
    width: 37%;
    background-color: #efefef;
    color: #f33737;
    letter-spacing: 0.2vmax;
    font-size: 1.2vmax;
    margin-top: 1%;
    padding: 0.8%;
    border: 0.1em solid #ddd;
    border-radius: 0.2em;
    opacity: 0.8;
  }

  input[type=submit]:hover,
  input[type=reset]:hover {
    background-image: linear-gradient(to bottom right, #900 20%, #ff7878 60%, #600 100%);
  }

  select:hover {
    opacity: 1;
  }

  input[type=submit]:focus,
  input[type=reset]:focus {
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
  }

  select:focus {
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
    border: 0.1em solid #900;
    background-color: #fcc;
  }

  option {
    padding: 0.4%;
  }

  ::placeholder {
    opacity: 0.5;
  }
</style>
