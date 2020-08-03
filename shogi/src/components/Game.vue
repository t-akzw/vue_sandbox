<template>
  <div class="Top">
  <div class="Game">Game {{ $route.params.id }}</div>

  <div id="board">{{ board[1]["ich"] }}
    <div id="itemA">A</div> <!-- アイテム -->
    <div id="itemB">B</div> <!-- アイテム -->
    <div id="itemC">C</div> <!-- アイテム -->
  </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Game extends Vue {
  board = {
    1: {
      ich: "香車"
    }
  }

}
// Top, 盤面とコマ置き場、色々なボタン含めた全部
// Ban, 盤面
// 9 8 7 6 5 4 3 2 1
//                   ich
//                   ni
//                   san
//                   shi
//                   go
//                   roku
//                   nana
//                   hachi
//                   kyu
</script>

<style>
#board {
    display: grid; /* グリッドレイアウト */
}
</style>