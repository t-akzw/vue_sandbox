<template>
  <div class="User">
    User {{ $route.params.id }}
    <router-link :to="`${$route.params.id}/game`">aa</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class User extends Vue {}
</script>
