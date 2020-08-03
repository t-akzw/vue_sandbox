<template>
  <div class="UserProfile">UserProfile {{ $route.params.id }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UserProfile extends Vue {}
</script>
