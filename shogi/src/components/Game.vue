<template>
  <div class="Top">
  <div class="Game">Game {{ $route.params.id }}</div>
  <v-btn rounded color="primary" dark @click="init" >Rounded Button</v-btn>

  <v-container>
    <v-row class="r1" justify="center">
        <v-col class="c1">hoge</v-col>
    </v-row>
    <v-row justify="center" v-for="(i, idx_row) in board" :key="idx_row" >
      <v-col v-for="(j, idx_col) in i" :key="idx_col" >
        <div>{{ j }}</div>
      </v-col>
    </v-row>
  </v-container>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// TODO: domain, modelに切り出す作業
type File = "一" | "二" | "三" | "四" | "五" | "六" | "七" | "八" | "九" // 筋
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 // 段

class Position { // 駒の座標
    constructor(
        private file: File,
        private rank: Rank
    ) {}
    distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        }
    }
} 

abstract class Piece { // 将棋の駒
    protected position: Position
    constructor(
        file: File,
        rank: Rank,
        own: boolean
    ) {
        this.position = new Position(file, rank)
    }
    meveTo(position: Position) {
        this.position = position
    }
    abstract canMoveTo(position: Position): boolean
} 

class King extends Piece { // 王将
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)
        return distance.rank < 2 && distance.file < 2
    }
}

class Rook {} // 飛車
class Bishop {} // 角行
class GoldGeneral {} // 金将
class SilverGeneral {} // 銀将
class Knight {} // 桂馬
class Lance {} // 香車
class Pawn {} // 歩兵

class ShogiGame {
    private pieces = ShogiGame.makePieces()
    
    private static makePieces() {
        const king = new King('一', 5, false)
        const king2 = new King('九', 5, true)
        const pieces = [king, king2]
        return pieces
    }
}

class Board {
    protected board: Piece[][]
    update(pieces: Piece[]){
        console.log(pieces)
    }
}

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
    init() {
        const obj = new ShogiGame()
        console.log(obj)
    }

  // xxメソッド
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
</style>