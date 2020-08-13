<template>
    <div class="Top">
        <div class="Game">Game {{ $route.params.id }}</div>
        <v-btn rounded color="primary" dark @click="init">Rounded Button</v-btn>
                <div class="opholding" >
                    <div class="sub_opholding">
                        <img class="piece" :src="hoge3(0)" alt="">
                    </div>
                    <div class="sub_opholding">
                        <img class="piece" :src="hoge3(0)" alt="">
                    </div>
                </div>

        <div class="ban">
            <div class="container">
                <div class="hoge">
                    <div justify="center" v-for="(i, idx_row) in board" :key="idx_row" class="rowxx">
                        <div v-for="(j, idx_col) in i" :key="idx_col" class="colxx">
                            <img class="piece" :src="hoge2(idx_col, idx_row)" alt="" @click="toMove(idx_col, idx_row)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <div class="myholding" >
                    <div class="sub_myholding">
                        <img class="piece" :src="hoge4(0)" alt="">
                    </div>
                    <div class="sub_myholding">
                        <img class="piece" :src="hoge4(0)" alt="">
                    </div>
                </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// TODO: domain, modelに切り出す作業
// 0は持ち駒状態
type File = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // 筋 Col
type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // 段 Row

class Position {
  // 駒の座標
  constructor(private file: File, private rank: Rank) {}
  distanceFrom(position: Position) {
    return {
      rank: position.rank - this.rank,
      file: position.file - this.file
    };
  }
}

abstract class Piece {
  // 将棋の駒
  public position: Position;
  protected own: boolean;
  public state: boolean;
  abstract name: string;
  abstract promoted_name: string;
  public promoted: boolean;
  public img: string;
  public moveList: boolean[];
  constructor(file: File, rank: Rank, own: boolean) {
    this.position = new Position(file, rank);
    this.own = own;
    this.state = false;
    this.promoted = false;
    this.img = this.getImgString();
  }
  meveTo(position: Position) {
    this.position = position;
  }
  canPotentialMoveTo(board: any) {
    console.log("hogehoge")
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            console.log(i,j, board[i][j].name)
            console.log(this.canMoveTo(board[i][j].position))
        }
    }
    return true
  }
  abstract canMoveTo(position: Position): boolean;
  getImgString(): string {
      const promotedIdx = (this.promoted)? "x" : "";
      const ownIdx = (this.own)? "My" : "Op";
      return "/img/koma/default/" + promotedIdx + ownIdx + this.constructor.name + ".svg"
  }
}

class King extends Piece {
  name = "王将";
  promoted_name = "王将";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}

class Rook extends Piece {
  name = "飛車";
  promoted_name = "竜王";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}

class Bishop extends Piece {
  name = "角行";
  promoted_name = "竜馬";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}

class GoldGeneral extends Piece {
  name = "金将";
  promoted_name = "金将";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return (distance.rank == -1 && Math.abs(distance.file) < 2) ||
        (distance.rank == 0 && 0 < Math.abs(distance.file) && Math.abs(distance.file) < 2) ||
        (distance.rank == 1 && distance.file == 0 );
  }
}

class SilverGeneral extends Piece {
  name = "銀将";
  promoted_name = "成銀";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return (distance.rank == -1 && Math.abs(distance.file) < 2) ||
        (distance.rank == 1 && (distance.file == -1 || distance.file == 1));
  }
}
class Knight extends Piece {
  name = "桂馬";
  promoted_name = "成桂";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return (distance.rank == -2 && distance.file == -1) ||
        (distance.rank == -2 && distance.file == 1);
  }
}

class Lance extends Piece {
  name = "香車";
  promoted_name = "成香";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 0 && distance.file == 0;
  }
}
class Pawn extends Piece {
  name = "歩兵";
  promoted_name = "と金";
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank == -1 && distance.file == 0;
  }
}

class NullPiece extends Piece {
  name = "";
  promoted_name = "";
  state = true;
  canMoveTo(position: Position) {
    return false;
  }
}

abstract class Captured {
  protected pieces: [];
  constructor() {
    this.pieces = [];
  }
}

class ShogiGame {
  public board = ShogiGame.makeBoard();
  private static makeBoard() {
    // TODO: 駒のfile, rankは手動で設定せずに自動で入れたい
    return {
      1: {
        1: new Lance(1, 1, false),
        2: new Knight(2, 1, false),
        3: new SilverGeneral(3, 1, false),
        4: new GoldGeneral(4, 1, false),
        5: new King(5, 1, false),
        6: new GoldGeneral(6, 1, false),
        7: new SilverGeneral(7, 1, false),
        8: new Knight(8, 1, false),
        9: new Lance(9, 1, false),
      },
      2: {
        1: new NullPiece(1, 2, false),
        2: new Rook(2, 2, false),
        3: new NullPiece(3, 2, false),
        4: new NullPiece(4, 2, false),
        5: new NullPiece(5, 2, false),
        6: new NullPiece(6, 2, false),
        7: new NullPiece(7, 2, false),
        8: new Bishop(8, 2, false),
        9: new NullPiece(9, 2, false),
      },
      3: {
        1: new Pawn(1, 3, false),
        2: new Pawn(2, 3, false),
        3: new Pawn(3, 3, false),
        4: new Pawn(4, 3, false),
        5: new Pawn(5, 3, false),
        6: new Pawn(6, 3, false),
        7: new Pawn(7, 3, false),
        8: new Pawn(8, 3, false),
        9: new Pawn(9, 3, false),
      },
      4: {
        1: new NullPiece(1, 4, false),
        2: new NullPiece(2, 4, false),
        3: new NullPiece(3, 4, false),
        4: new NullPiece(4, 4, false),
        5: new NullPiece(5, 4, false),
        6: new NullPiece(6, 4, false),
        7: new NullPiece(7, 4, false),
        8: new NullPiece(8, 4, false),
        9: new NullPiece(9, 4, false),
      },
      5: {
        1: new NullPiece(1, 5, false),
        2: new NullPiece(2, 5, false),
        3: new NullPiece(3, 5, false),
        4: new NullPiece(4, 5, false),
        5: new NullPiece(5, 5, false),
        6: new NullPiece(6, 5, false),
        7: new NullPiece(7, 5, false),
        8: new NullPiece(8, 5, false),
        9: new NullPiece(9, 5, false),
      },
      6: {
        1: new NullPiece(1, 6, false),
        2: new NullPiece(2, 6, false),
        3: new NullPiece(3, 6, false),
        4: new NullPiece(4, 6, false),
        5: new NullPiece(5, 6, false),
        6: new NullPiece(6, 6, false),
        7: new NullPiece(7, 6, false),
        8: new NullPiece(8, 6, false),
        9: new NullPiece(9, 6, false),
      },
      7: {
        1: new Pawn(1, 7, true),
        2: new Pawn(2, 7, true),
        3: new Pawn(3, 7, true),
        4: new Pawn(4, 7, true),
        5: new Pawn(5, 7, true),
        6: new Pawn(6, 7, true),
        7: new Pawn(7, 7, true),
        8: new Pawn(8, 7, true),
        9: new Pawn(9, 7, true),
      },
      8: {
        1: new NullPiece(1, 8, true),
        2: new Bishop(2, 8, true),
        3: new NullPiece(3, 8, true),
        4: new NullPiece(4, 8, true),
        5: new NullPiece(5, 8, true),
        6: new NullPiece(6, 8, true),
        7: new NullPiece(7, 8, true),
        8: new GoldGeneral(8, 8, true),
        //8: new Rook(8, 8, true),
        9: new NullPiece(9, 8, false),
      },
      9: {
        1: new Lance(1, 9, true),
        2: new Knight(2, 9, true),
        3: new SilverGeneral(3, 9, true),
        4: new GoldGeneral(4, 9, true),
        5: new King(5, 9, true),
        6: new GoldGeneral(6, 9, true),
        7: new SilverGeneral(7, 9, true),
        8: new Knight(8, 9, true),
        9: new Lance(9, 9, true),
      },
    };
  }
}

@Component({
  components: {
  }
})
export default class Game extends Vue {
  board = {};
  myHolding = [ (new Lance(0, 0, true)), new Lance(0, 0, false) ];
  opHolding = [ (new Lance(0, 0, false)), new Lance(0, 0, false)];
  state = false;
  init() {
    const obj = new ShogiGame();
    this.board = obj.board;
    console.log(this.board[1][1])
    // 状態をDBにセットする必要がある
  }
  // hoge(i, j) {
  //     this.board[i][j] = new MyKing(i, j, false)
  // }
  holding(i, j) {
    console.log(i, j);
    console.log("hogehoge", this.board[i][j].getImgString())
    this.board[i][j].state = true;
  }

  hoge(i, j) {
    console.log("hoge");
    return this.board[i][j].state;
  }

  hoge2(i, j) {
    return this.board[i][j].img;
  }

  hoge3(i) {
      return this.opHolding[i].img;
  }
  hoge4(i) {
      return this.myHolding[i].img;
  }
  toMove(i, j) {
      console.log("tomove", i, j)
      console.log(this.board[i][j].canPotentialMoveTo(this.board))
  }
  // xxメソッド
}
// TODO1: ボタンから将棋の駒に変更する、div要素で@clickによってcssを変更する
// TODO: リサイズしても盤面の9x9が崩れないようにする
// TODO: DBに持つべきものは、盤面、駒の動き、持ち駒のリスト
// TODO: 持ち駒フィールドの用意
// TODO: 手番の実装
// TODO: 駒のnameの持ち方
// TODO: boardの型
// TODO: 盤面の配列と将棋の読み方がずれているので直す
// TODO: NullPieceのclickをdisableにする
// TODO: 桂馬などの自動で成る判定はtoPromoteで実装、移動では考慮しない
// TODO: 盤面にマルポチを4箇所入れる
// TODO: 敵駒は動きが変わるので対応を入れる
</script>

<style>
img.piece {
  width: 70%;
  height: 70%;
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
    background-color: #FDF8ED;
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
    height: calc(100%/9);
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
    background-color: #FDF8ED;
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
