<template>
  <v-app>
    <router-link to="/home">Home</router-link>
    <router-link to="/hello">Hello</router-link>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  })
});
</script>
