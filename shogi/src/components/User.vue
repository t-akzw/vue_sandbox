<template>
  <div class="User">User {{ $route.params.id }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class User extends Vue {}
</script>
