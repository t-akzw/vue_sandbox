<template>
  <div>
    <div class="hello">Hello {{ msg }} {{ triple }}</div>
    <button @click="onClickButton">Click Me!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Hello extends Vue {
  msg = "World!!";
  num = 1;

  get triple() {
    return this.num * 3;
  }

  onClickButton() {
    this.num = 10;
  }

  mounted() {
    this.num = 4;
  }
}
</script>
