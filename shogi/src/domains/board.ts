import { 
    Piece,
    Pawn,
    Lance,
    Knight,
    SilverGeneral,
    GoldGeneral,
    King,
    Rook,
    Bishop,
    NullPiece
} from "@/domains/piece";
import { File, Rank, Position } from "@/domains/position"

export type BoardDomain = Piece[][];

/*
  allMovablePlace(board: Board): boolean[][] {
    const arrI: boolean[][] = new Array(9);
    for (let i = 1; i < 10; i++) {
      const arrJ: boolean[] = new Array(9);
      for (let j = 1; j < 10; j++) {
        board[i][j].selected = this.canMoveTo(board[i][j].position);
        board[i][j].setImgString();
        arrJ[j] = this.canMoveTo(board[i][j].position);
      }
      arrI[i] = arrJ;
    }
    return arrI;
  }
*/

export class Board {
    Board: BoardDomain = new Array(9);
    clickedNow!: Piece;
    constructor() {
        this.makeBoard()
    }
    /*
    private setPiece(rank: Rank, file: File): void {
        
    }*/

    public makeBoard(): void {
        console.log("hoge", this.Board)

        for (let i = 0; i < 9; i++) {
            this.Board[i] = new Array(9);
        }

        // ダサいので配列の位置をセットできるようにする
        this.Board[0] = [
            new Lance(1, 1, false), new Knight(2, 1, false), new SilverGeneral(3, 1, false),
            new GoldGeneral(4, 1, false), new King(5, 1, false), new GoldGeneral(6, 1, false),
            new SilverGeneral(7, 1, false), new Knight(8, 1, false), new Lance(9, 1, false) ]
        this.Board[1] = [
            new NullPiece(1, 2, false), new Rook(2, 2, false), new NullPiece(3, 2, false),
            new NullPiece(4, 2, false), new NullPiece(5, 2, false), new NullPiece(6, 2, false),
            new NullPiece(7, 2, false), new Bishop(8, 2, false), new NullPiece(9, 2, false) ]
        this.Board[2] = [
            new Pawn(1, 3, false), new Pawn(2, 3, false), new Pawn(3, 3, false),
            new Pawn(4, 3, false), new Pawn(5, 3, false), new Pawn(6, 3, false),
            new Pawn(7, 3, false), new Pawn(8, 3, false), new Pawn(9, 3, false) ]
        this.Board[3] = [
            new NullPiece(1, 4, false), new NullPiece(2, 4, false), new NullPiece(3, 4, false),
            new NullPiece(4, 4, false), new NullPiece(5, 4, false), new NullPiece(6, 4, false),
            new NullPiece(7, 4, false), new NullPiece(8, 4, false), new NullPiece(9, 4, false) ]
        this.Board[4] = [
            new NullPiece(1, 5, false), new NullPiece(2, 5, false), new NullPiece(3, 5, false),
            new NullPiece(4, 5, false), new NullPiece(5, 5, false), new NullPiece(6, 5, false),
            new NullPiece(7, 5, false), new NullPiece(8, 5, false), new NullPiece(9, 5, false) ]
        this.Board[5] = [
            new NullPiece(1, 6, false), new NullPiece(2, 6, false), new NullPiece(3, 6, false),
            new NullPiece(4, 6, false), new NullPiece(5, 6, false), new NullPiece(6, 6, false),
            new NullPiece(7, 6, false), new NullPiece(8, 6, false), new NullPiece(9, 6, false) ]
        this.Board[6] = [
            new Pawn(1, 7, true), new Pawn(2, 7, true), new Pawn(3, 7, true),
            new Pawn(4, 7, true), new Pawn(5, 7, true), new Pawn(6, 7, true),
            new Pawn(7, 7, true), new Pawn(8, 7, true), new Pawn(9, 7, true) ]
        this.Board[7] = [
            new NullPiece(1, 8, true), new Bishop(2, 8, true), new NullPiece(3, 8, true),
            new NullPiece(4, 8, true), new NullPiece(5, 8, true), new NullPiece(6, 8, true),
            new NullPiece(7, 8, true), new Rook(8, 8, true), new NullPiece(9, 8, false) ]
        this.Board[8] = [
            new Lance(1, 9, true), new Knight(2, 9, true), new SilverGeneral(3, 9, true),
            new GoldGeneral(4, 9, true), new King(5, 9, true), new GoldGeneral(6, 9, true),
            new SilverGeneral(7, 9, true), new Knight(8, 9, true), new Lance(9, 9, true) ]
    }

    unselect(): void {
      console.log("unselect")
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.Board[i][j].selected = false;
          this.Board[i][j].setImgString();
        }
      }
    }

    clickedBanPiece(i: number, j: number): void {
      console.log("clickBanPiece")
      this.unselect();
      if (this.clickedNow !== undefined) {
        const distance = this.clickedNow.position.distanceFrom(this.Board[i][j].position)
        //console.log("dist", distance)
        if (distance.file !== 0 || distance.rank !== 0) {
          this.clickedNow.clicked = false; // これまで押されていた場所をunclickする
          this.clickedNow.setImgString(); // これまで押されていた場所をunclickする
        }
      }
      this.clickedNow = this.Board[i][j];
      this.Board[i][j].clicked = !this.Board[i][j].clicked;
      this.Board[i][j].setImgString();
      if (!this.Board[i][j].disabled) {
        //this.Board[i][j].canMoveTo(this.Board);
      }
      if (this.Board[i][j].clicked) { // clickedがtrueの時のみ移動範囲を表示したいため
        // this.board[i][j].allMovablePlace(this.board)
        //this.Board[i][j].movablePlace(this.Board)
      }
    }
}

