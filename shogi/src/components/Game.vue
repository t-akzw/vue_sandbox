<template>
  <div class="Top">
  <div class="Game">Game {{ $route.params.id }}</div>

  <v-container>
    <v-row justify="center" v-for="(i, idx_row) in board" :key="idx_row" >
      <v-col v-for="(j, idx_col) in i" :key="idx_col" >
        <div></div>
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

// TODO: domain, modelに切り出す作業
class ShogiGame {}
class Piece {} // 将棋の駒
class Position {} // 駒の座標
class King {} // 王将
class Rook {} // 飛車
class Bishop {} // 角行
class GoldGeneral {} // 金将
class SilverGeneral {} // 銀将
class Knight {} // 桂馬
class Lance {} // 香車
class Pawn {} // 歩兵

type File = "一" | "二" | "三" | "四" | "五" | "六" | "七" | "八" | "九" // 筋
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 // 段

</script>

<style>
#board {
    display: grid; /* グリッドレイアウト */
}
</style>