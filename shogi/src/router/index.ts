import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Hello from "@/components/Hello.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: Home
    },
    {
      path: "/hello",
      component: Hello
    }
  ]
});
