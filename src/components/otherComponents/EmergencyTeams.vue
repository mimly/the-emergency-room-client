<template>
  <fieldset id="et">
    <legend><strong>Emergency teams: </strong></legend>

    <div>
      <div class="tab">
        <button v-for="{ ID, name} in emergencyTeamsWithPatients" :key="ID"
                @click="onClick(name)"
                v-show="$store.getters.getEmergencyTeamsCompetentToDealWith.some((x) => x.name === name)"
                v-text="name">
        </button>
      </div>

      <div v-for="{ ID, name, patients } in emergencyTeamsWithPatients" :key="ID"
           v-show="$store.getters.getEmergencyTeamsCompetentToDealWith.some((x) => x.name === name)">
        <transition name="bounce">
        <div class="tab-content" v-show="$store.getters.getVisibleTeam === name">
          <table>
            <tr>
              <th v-for="x in headers" :key="x" v-text="x"></th>
            </tr>
            <tr v-for="{ ID, firstName, lastName, priority, waitingTime } in patients" :key="ID"
                :class="{'flare': ID === '-', 'blink': (waitingTime === 0) && isBlinking}">
              <th v-for="x in [ID, firstName, lastName, priority, waitingTime]" :key="x" v-text="x"></th>
            </tr>
          </table>
        </div>
        </transition>
      </div>
    </div>

  </fieldset>
</template>

<script>
export default {
  name: "EmergencyTeams",
  components: {},
  data () {
    return {
      headers: ["ID", "First name", "Last name", "Priority", "Waiting time"],
      isBlinking: false,
      blinker: null
    };
  },
  computed: {
    emergencyTeamsWithPatients () {
      const self = this;
      const emergencyTeamsWithPatients = JSON.parse(JSON.stringify(this.$store.getters.getEmergencyTeamsWithPatients));
      emergencyTeamsWithPatients.map((x) => {
        if (self.$store.getters.getUsername === "TNUR") x.patients.push(self.$store.getters.getCurrentPatient);
        x.patients.sort((y, z) => self.$store.getters.getPriorities.map((p) => p.name).indexOf(z.priority) - self.$store.getters.getPriorities.map((p) => p.name).indexOf(y.priority));
      });
      return emergencyTeamsWithPatients;
    }
  },
  methods: {
    onClick (emergencyTeam) {
      if (this.$store.getters.getVisibleTeam === emergencyTeam) {
        this.$store.commit("updateVisibleTeam", "");
      } else {
        this.$store.commit("updateVisibleTeam", emergencyTeam);
      }
    }
  },
  created () {
    const self = this;
    this.blinker = setInterval(() => {
      self.isBlinking = !self.isBlinking;
    }, 500);
  },
  beforeDestroy () {
    clearInterval(this.blinker);
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
  table {
    user-select: none;
  }

  legend {
    font-size: 2vmax;
    letter-spacing: 0.2vmax;
  }

  table {
    width: 100%;
  }

  th,
  td {
    padding: 0.4%;
  }

  tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.2);
  }

  tr:first-child {
    background-color: rgba(0, 0, 0, 0.8);
    color: antiquewhite;
  }

  .blink {
    background-color: rgba(255, 0, 0, 0.2) !important;
  }

  .flare {
    background-color: rgba(255, 128, 0, 0.2) !important;
  }

  .tab {
    overflow: hidden;
    background-image: linear-gradient(to bottom right, #600 20%, #900 60%, #000 100%);
    box-shadow: 2px 2px 10px 2px rgba(204, 204, 204, 0.9);
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
    border: none;
    border-radius: 0.2em;
    color: white;
    letter-spacing: 0.2vmax;
    font-size: 1.2vmax;
    padding: 0.8%;
  }

  .tab button {
    background-color: inherit;
    color: inherit;
    float: left;
    outline: none;
    cursor: pointer;
    letter-spacing: 0.2vmax;
    font-size: 1.2vmax;
    margin-right: 1%;
    padding: 0.8%;
    border: none;
    border-radius: 0.2em;
    text-shadow: 4px 4px 4px rgba(228, 125, 132, 1);
  }

  .tab button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: antiquewhite;
  }

  .tab button:active {
    background-color: rgba(0, 0, 0, 0.2);
    color: antiquewhite;
  }

  .tab-content {
    padding: 0.4% 0.8%;
    border: 0.05em solid #ccc;
    font-size: 1.2vmax;
    letter-spacing: 0.1vmax;
  }

  .bounce-enter-active {
    animation: bounce-in 1.2s;
  }

  .bounce-leave-active {
    animation: bounce-in 0.4s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
