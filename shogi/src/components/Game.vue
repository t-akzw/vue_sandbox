<template>
  <div class="Top">
  <div class="Game">Game {{ $route.params.id }}</div>

  <v-container>
    <v-row justify="center" v-for="(i, idx_row) in board" :key="idx_row" >
      <v-col v-for="(j, idx_col) in i" :key="idx_col" >
        {{ j }}
      </v-col>
    </v-row>
  </v-container>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Game extends Vue {
  board = [
    ["香車", "桂馬", "銀将", "金将", "王将", "金将", "銀将", "桂馬", "香車"],
    ["", "飛車", "", "", "", "", "", "角行", ""],
    ["歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵"],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵"],
    ["", "角行", "", "", "", "", "", "飛車", ""],
    ["香車", "桂馬", "銀将", "金将", "玉将", "金将", "銀将", "桂馬", "香車"]
  ]
}
// TODO: リサイズしても盤面の9x9が崩れないようにする
// Top, 盤面とコマ置き場、色々なボタン含めた全部
// Ban, 盤面
// 9 8 7 6 5 4 3 2 1
//                   a: ich
//                   b: ni
//                   c: san
//                   d: shi
//                   e: go
//                   f: roku
//                   g: nana
//                   h: hachi
//                   i: kyu
</script>

<style>
#board {
    display: grid; /* グリッドレイアウト */
}
</style>