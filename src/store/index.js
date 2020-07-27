import Vue from "vue";
import Vuex from "vuex";
import createMultiTabState from "vuex-multi-tab-state";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    auth: {
      authenticated: false,
      status: 401,
      error: "Unauthorized",
      role: undefined,
      username: undefined
    },
    visibleTeam: undefined,
    currentPatient: {
      ID: undefined,
      firstName: undefined,
      lastName: undefined,
      sex: undefined,
      age: undefined,
      medicalIssue: {},
      priority: {},
      emergencyTeam: {},
      waitingTime: undefined,
      drugs: [],
      medicalProcedures: [],
      outcome: {}
    },
    medicalIssues: [],
    priorities: [],
    emergencyTeams: [],
    emergencyTeamsWithPatients: [],
    emergencyTeamsCompetentToDealWith: [],
    drugs: [],
    medicalProcedures: [],
    outcomes: []
  },
  mutations: {
    invalidate (state) {
      state.auth = {
        authenticated: false,
        status: 401,
        error: "Unauthorized",
        role: undefined,
        username: undefined
      };
    },
    authenticate (state, { authenticated, status, error, role, username }) {
      state.auth = { authenticated, status, error, role, username };
    },
    resetVisibleTeam (state) {
      state.visibleTeam = undefined;
    },
    updateVisibleTeam (state, visibleTeam) {
      state.visibleTeam = visibleTeam;
    },
    resetCurrentPatient (state) {
      state.currentPatient = {
        ID: undefined,
        firstName: undefined,
        lastName: undefined,
        sex: undefined,
        age: undefined,
        medicalIssue: {},
        priority: {},
        emergencyTeam: {},
        waitingTime: undefined,
        drugs: [],
        medicalProcedures: [],
        outcome: {}
      };
    },
    updateCurrentPatient (state, patient) {
      Object.assign(state.currentPatient, patient);
    },
    updateCurrentPatientID (state, ID) {
      state.currentPatient.ID = ID;
    },
    updateCurrentPatientFirstName (state, firstName) {
      state.currentPatient.firstName = firstName;
    },
    updateCurrentPatientLastName (state, lastName) {
      state.currentPatient.lastName = lastName;
    },
    updateCurrentPatientSex (state, sex) {
      state.currentPatient.sex = sex;
    },
    updateCurrentPatientAge (state, age) {
      state.currentPatient.age = age;
    },
    updateCurrentPatientMedicalIssue (state, medicalIssue) {
      state.currentPatient.medicalIssue = medicalIssue;
    },
    updateCurrentPatientPriority (state, priority) {
      state.currentPatient.priority = priority;
    },
    updateCurrentPatientEmergencyTeam (state, emergencyTeam) {
      state.currentPatient.emergencyTeam = emergencyTeam;
    },
    updateCurrentPatientWaitingTime (state, waitingTime) {
      state.currentPatient.waitingTime = waitingTime;
    },
    updateCurrentPatientDrugs (state, drugs) {
      state.currentPatient.drugs = drugs;
    },
    updateCurrentPatientMedicalProcedures (state, medicalProcedures) {
      state.currentPatient.medicalProcedures = medicalProcedures;
    },
    updateCurrentPatientOutcome (state, outcome) {
      state.currentPatient.outcome = outcome;
    },
    updateMedicalIssues (state, medicalIssues) {
      state.medicalIssues = medicalIssues;
    },
    updatePriorities (state, priorities) {
      state.priorities = priorities;
    },
    updateEmergencyTeams (state, emergencyTeams) {
      state.emergencyTeams = emergencyTeams;
    },
    updateEmergencyTeamsWithPatients (state, emergencyTeamsWithPatients) {
      state.emergencyTeamsWithPatients = emergencyTeamsWithPatients;
    },
    updateEmergencyTeamsCompetentToDealWith (state, emergencyTeamsCompetentToDealWith) {
      state.emergencyTeamsCompetentToDealWith = emergencyTeamsCompetentToDealWith;
    },
    updateDrugs (state, drugs) {
      state.drugs = drugs;
    },
    updateMedicalProcedures (state, medicalProcedures) {
      state.medicalProcedures = medicalProcedures;
    },
    updateOutcomes (state, outcomes) {
      state.outcomes = outcomes;
    }
  },
  getters: {
    isAuthenticated: (state) => state.auth.authenticated,
    getError: (state) => state.auth.error,
    getRole: (state) => state.auth.role,
    getUsername: (state) => state.auth.username,
    getVisibleTeam: (state) => state.visibleTeam,
    getCurrentPatient: (state) => state.currentPatient,
    getMedicalIssues: (state) => state.medicalIssues,
    getPriorities: (state) => state.priorities,
    getEmergencyTeams: (state) => state.emergencyTeams,
    getEmergencyTeamsWithPatients: (state) => state.emergencyTeamsWithPatients,
    getEmergencyTeamsCompetentToDealWith: (state) => state.emergencyTeamsCompetentToDealWith,
    getDrugs: (state) => state.drugs,
    getMedicalProcedures: (state) => state.medicalProcedures,
    getOutcomes: (state) => state.outcomes
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createMultiTabState({
      statesPaths: ["auth", "visibleTeam", "currentPatient"]
    })
  ]
});
