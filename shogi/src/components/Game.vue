<template>
  <div class="Top">
    <div class="Game">Game {{ $route.params.id }}</div>
    <div class="opholding">
      <div class="sub_opholding">
        <img class="piece" :src="hoge3(0)" alt="" />
      </div>
      <div class="sub_opholding">
        <img class="piece" :src="hoge3(0)" alt="" />
      </div>
    </div>

    <div class="ban">
      <div class="container">
        <div class="hoge">
          <div
            justify="center"
            v-for="(i, idx_row) in board.Board"
            :key="idx_row"
            class="rowxx"
          >
            <div v-for="(j, idx_col) in i" :key="idx_col" class="colxx">
              <img
                :class="pieceStyle(idx_col, idx_row)"
                :src="hoge2(idx_col, idx_row)"
                @click="clickedBanPiece(idx_col, idx_row)"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="myholding">
      <div class="sub_myholding">
        <img class="piece" :src="hoge4(0)" alt="" />
      </div>
      <div class="sub_myholding">
        <img class="piece" :src="hoge4(0)" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { File, Rank, Position } from "../domains/position";
import { Board } from "../domains/board";
import { Holding } from "../domains/holding";

@Component({ components: {} })
export default class Game extends Vue {
  hold = new Holding()
  board = new Board()
  myHolding = []
  opHolding = []
  clickedNow = undefined
  constructor() {
    super();
    this.myHolding = this.hold.myHolding()
    this.opHolding = this.hold.opHolding()
  }

  holding(i: number, j: number) {
    console.log(i, j);
    console.log("hogehoge", this.board.Board[i][j].getImgString());
  }

  hoge2(i: number, j: number) {
    return this.board.Board[i][j].img;
  }

  hoge3(i: number) {
    return this.opHolding[i].img;
  }
  hoge4(i: number) {
    return this.myHolding[i].img;
  }
  clickedBanPiece(i: number, j: number) {
    return this.board.clickedBanPiece(i, j)
  }
  pieceStyle(i: number, j: number) {
    return this.board.Board[i][j].own? 'piece-own' : 'piece-ops'
  }
}
// TODO: DBに持つべきものは、盤面、駒の動き、持ち駒のリスト
// TODO: 持ち駒フィールドの用意
// TODO: 手番の実装
// TODO: 駒のnameの持ち方
// TODO: 盤面の配列と将棋の読み方がずれているので直す
// TODO: 桂馬などの自動で成る判定はtoPromoteで実装、移動では考慮しない
// TODO: 盤面にマルポチを4箇所入れる
// TODO: クリックを自分の駒以外disableにする
</script>

<style>
img.piece-own {
  width: 96%;
  height: 96%;
}
img.piece-ops {
  width: 96%;
  height: 96%;
  transform: rotate( -180deg );
}
img.piece {
  width: 96%;
  height: 96%;
}
.hoge {
  position: absolute;
  display: grid; /* グリッドレイアウト */
  grid-template-columns: repeat(9, 1fr);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
}
.hoge:before {
  padding-top: 100%;
}
div.Top {
  width: 70%;
  position: relative;
}
.container {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fdf8ed;
}

.container:before {
  content: "";
  display: block;
  padding-top: 100%;
  border: 1px solid #565451;
}
div.container {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}

.colxx {
  border-top: 1px solid #565451;
  border-left: 1px solid #565451;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: auto;
  vertical-align: middle;
  display: -webkit-flex;
}
.rowxx {
  width: 100%;
  height: calc(100% / 9);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.User {
  height: 100%;
  width: 100%;
}
div.ban {
  padding: 1rem;
  background-color: #FDF1DB;
}
div.opholding {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  background-color: #dbb25a;
}
div.myholding {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  background-color: #dbb25a;
}
</style>
