/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";

import down from "../components/download_page.vue";
import test from "../components/newpage";
import step1 from "../components/step1.vue";
import step2 from "../components/step2.vue";
import step3 from "../components/step3.vue";
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: home
  // },
  {
    path: "/results",
    name: "download",
    component: down
  },
  {
    path: "/",
    name: "test",
    component: test
  },
  {
    path: "/home",
    name: "home",
    component: step1
  },
  {
    path: "/s2",
    name: "step2",
    component: step2
  },
  {
    path: "/s3",
    name: "step3",
    component: step3
  }
];

const router = new VueRouter({
  routes
});

export default router;
