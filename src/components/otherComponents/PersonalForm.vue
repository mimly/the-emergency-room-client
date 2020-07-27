<template>
  <fieldset>
    <legend><strong>Personal form: </strong></legend>

    <form @submit.prevent="onAssign" @reset="onReset" ref="personalForm">
      <div>
        <input v-model="firstName" type="text" placeholder="First name: " pattern="[A-Za-z ]+" maxlength=32 minlength=2 required />
        <br/>
        <input v-model="lastName" type="text" placeholder="Last name: " pattern="[A-Za-z ]+" maxlength=32 minlength=2 required />
      </div>

      <div>
        <select v-model="sex" required>
          <option value="" disabled selected hidden>Sex: </option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <div>
        <input v-model="age" type="number" placeholder="Age: " min="1" max="120" required />
      </div>

      <div>
        <br/>
        <label for="medicalIssue"><strong>Medical issue: </strong></label>
        <br/>
        <select v-model="medicalIssue" id="medicalIssue" required>
          <option value="" disabled selected hidden>Medical issue: </option>
          <option v-for="{ ID, name } in $store.getters.getMedicalIssues" :key="ID" :value="name" v-text="name"></option>
        </select>
      </div>

      <div>
        <br/>
        <label for="priority"><strong>Priority: </strong></label>
        <br/>
        <select v-model="priority" id="priority" required>
          <option value="" disabled selected hidden>Priority: </option>
          <option v-for="{ ID, name } in $store.getters.getPriorities" :key="ID" :value="name" v-text="name"></option>
        </select>
      </div>

      <div>
        <br/>
        <label for="emergencyTeam"><strong>Assign to: </strong></label>
        <br/>
        <select v-model="emergencyTeam" id="emergencyTeam" required>
          <option value="" disabled selected hidden>Assign to: </option>
          <option v-for="{ ID, name } in $store.getters.getEmergencyTeamsCompetentToDealWith" :key="ID" :value="name" v-text="name"></option>
        </select>
      </div>

      <input type="submit" value="ASSIGN"/>
      <input type="reset" value="RESET"/>
    </form>

  </fieldset>
</template>

<script>
export default {
  name: "PersonalForm",
  components: {},
  computed: {
    firstName: {
      get () { return this.$store.getters.getCurrentPatient.firstName; },
      set (value) { this.$store.commit("updateCurrentPatientFirstName", value); }
    },
    lastName: {
      get () { return this.$store.getters.getCurrentPatient.lastName; },
      set (value) { this.$store.commit("updateCurrentPatientLastName", value); }
    },
    sex: {
      get () { return this.$store.getters.getCurrentPatient.sex; },
      set (value) { this.$store.commit("updateCurrentPatientSex", value); }
    },
    age: {
      get () { return this.$store.getters.getCurrentPatient.age; },
      set (value) { this.$store.commit("updateCurrentPatientAge", value); }
    },
    medicalIssue: {
      get () { return this.$store.getters.getCurrentPatient.medicalIssue; },
      set (value) { this.$store.commit("updateCurrentPatientMedicalIssue", value); }
    },
    priority: {
      get () { return this.$store.getters.getCurrentPatient.priority; },
      set (value) { this.$store.commit("updateCurrentPatientPriority", value); }
    },
    emergencyTeam: {
      get () { return this.$store.getters.getCurrentPatient.emergencyTeam; },
      set (value) { this.$store.commit("updateCurrentPatientEmergencyTeam", value); }
    }
  },
  watch: {
    async medicalIssue (newValue) {
      // show all teams after reset
      if (newValue === "") {
        this.$store.commit("updateEmergencyTeamsCompetentToDealWith", this.$store.getters.getEmergencyTeams);
      } else {
        this.$store.commit("updateEmergencyTeamsCompetentToDealWith", await this.getEmergencyTeamsCompetentToDealWith(newValue));
      }
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
      for (const emergencyTeam of JSON.parse(JSON.stringify(this.$store.getters.getEmergencyTeams))) {
        emergencyTeam.patients = await this.getPatientsFor(emergencyTeam.name);
        emergencyTeamsWithPatients.push(emergencyTeam);
      }
      return emergencyTeamsWithPatients;
    },
    getPriorities: async () => {
      const result = await fetch("/api/priorities");
      return await result.json();
    },
    getMedicalIssues: async () => {
      const result = await fetch("/api/medical-issues");
      return await result.json();
    },
    async getEmergencyTeamsCompetentToDealWith (medicalIssue) {
      const result = await fetch(`/api/emergency-teams/competent-to-deal-with/${medicalIssue}`);
      return await result.json();
    },
    async onAssign () {
      const result = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.$store.getters.getCurrentPatient)
      });
      await result.json();

      this.$store.commit("updateEmergencyTeamsWithPatients", await this.getEmergencyTeamsWithPatients());
      this.$refs.personalForm.reset();
    },
    onReset () {
      this.$store.commit("resetCurrentPatient");
      this.$scrollTo("#et", 800, { easing: [0.6, 0.8, 0.3, 1.9], offset: -60 });
    }
  },
  async beforeMount () {
    this.$root.apiSocket.on("commitment", async () => {
      this.$root.debug("ON -> commitment");
      this.$store.commit("updateEmergencyTeamsWithPatients", await this.getEmergencyTeamsWithPatients());
    });

    this.$store.commit("resetCurrentPatient");
    this.$store.commit("updateEmergencyTeams", await this.getEmergencyTeams());
    this.$store.commit("updateEmergencyTeamsCompetentToDealWith", this.$store.getters.getEmergencyTeams);
    this.$store.commit("updateEmergencyTeamsWithPatients", await this.getEmergencyTeamsWithPatients());
    this.$store.commit("updateMedicalIssues", await this.getMedicalIssues());
    this.$store.commit("updatePriorities", await this.getPriorities());
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

  input[type=text],
  input[type=number],
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

  input[type=text]:hover,
  input[type=number]:hover,
  select:hover {
    opacity: 1;
  }

  input[type=submit]:focus,
  input[type=reset]:focus {
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
  }

  input[type=text]:focus,
  input[type=number]:focus,
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
