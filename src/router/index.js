import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/SignInView.vue";
import TriageNurse from "../views/TriageNurseView.vue";
import PhysicianTeam from "../views/PhysicianTeamView.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/triageNurse/:name",
    name: "TriageNurse",
    component: TriageNurse
  },
  {
    path: "/physicianTeam/:name",
    name: "PhysicianTeam",
    component: PhysicianTeam
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

// Authentication guard
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.getters.isAuthenticated) {
    next({ name: "Login" });
  } else if (to.path !== `/${store.getters.getRole}/${store.getters.getUsername}` && store.getters.isAuthenticated) {
    next({ path: `/${store.getters.getRole}/${store.getters.getUsername}` });
  } else {
    next();
  }
});

export default router;
