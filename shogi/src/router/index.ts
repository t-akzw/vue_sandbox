import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Hello from "@/components/Hello.vue";
import User from "@/components/User.vue";
import Error from "@/components/Error.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/hello",
      component: Hello
    },
    {
      path: "/user/:id",
      component: User
    },
    {
      path: "*",
      component: Error
    }
  ]
});
