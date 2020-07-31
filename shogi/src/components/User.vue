<template>
  <div class="User">User {{ $route.params.id }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "User",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ]
  })
});
</script>
