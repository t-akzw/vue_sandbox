import { File, Rank, Position } from "@/domains/position";
import { BoardDomain } from "@/domains/board";

export abstract class Piece {
  public position: Position;
  protected own: boolean;
  public promoted: boolean;
  public img!: string;
  public clicked: boolean;
  public selected: boolean;
  public disabled: boolean;
  public name!: string;
  constructor(file: File, rank: Rank, own: boolean) {
    this.position = new Position(file, rank);
    this.own = own;
    this.promoted = false;
    this.setImgString();
    this.disabled = false;
    this.clicked = false;
    this.selected = false;
  }
  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
  defaultCanMoveTo(position: Position): boolean {
    const distance = this.position.distanceFrom(position);
    const val = this.own ? -1 : 1;
    return (
      (distance.rank == val && Math.abs(distance.file) < 2) ||
      (distance.rank == 0 &&
        0 < Math.abs(distance.file) &&
        Math.abs(distance.file) < 2) ||
      (distance.rank == -val && distance.file == 0)
    );
  }
  setImgString(): void {
    const promotedIdx = this.promoted ? "x" : "";
    let imgState = "Normal";
    if (this.clicked !== undefined) {
      imgState = this.clicked ? "Clicked" : "Normal";
    }
    if (this.selected !== undefined && this.clicked !== true) { // Clickされている時はSelectedは無効
      imgState = this.selected ? "Selected" : "Normal";
    }
    this.img = (
      "/img/koma/v1/" +
      promotedIdx +
      this.constructor.name +
      imgState +
      ".svg"
    );
  }
  setSelectedImg() {
    if (this.constructor.name === "NullPiece") {
      console.log("hogex?")
      this.selected = true;
      this.setImgString();
    }
  }
}

export class GoldGeneral extends Piece {
  canMoveTo(position: Position) {
    return this.defaultCanMoveTo(position);
  }
  movablePlace(board: BoardDomain): void {
    // ABC
    // D E
    //  F
    console.log("hogehoge", board, this.position.getRank())
    let x = [true, true, true, true, true, true]

    if (this.position.getRank() < 2) { 
      if (this.position.getFile() < 2) {
        x = [false, false, false, true, false, true]
      } else if (8 < this.position.getFile()) {
        x = [false, false, false, false, true, true]
      } else {
        x = [false, false, false, true, true, true]
      }
    } else if (8 < this.position.getRank()) {
      if (this.position.getFile() < 2) {
        x = [true, true, false, true, false, false]
      } else if (8 < this.position.getFile()) {
        x = [false, true, true, false, true, false]
      } else {
        x = [true, true, true, true, true, false]
      }
    } else {
      x = [true, true, true, true, true, true]
    }
    console.log("x", x)
    if (x[0]) { // A
      const p = this.position.getArrayPosition(-1, 1);
      board[p.rank][p.file].setSelectedImg();
    }
    if (x[1]) { // B
      const p = this.position.getArrayPosition(-1, 0);
      board[p.rank][p.file].setSelectedImg();
    }
    if (x[2]) { // C
      const p = this.position.getArrayPosition(-1, -1);
      board[p.rank][p.file].setSelectedImg();
    }
    if (x[3]) { // D
      const p = this.position.getArrayPosition(0, 1);
      board[p.rank][p.file].setSelectedImg();
    }
    if (x[4]) { // E
      const p = this.position.getArrayPosition(0, -1);
      board[p.rank][p.file].setSelectedImg();
    }
    if (x[5]) { // F
      const p = this.position.getArrayPosition(1, 0);
      board[p.rank][p.file].setSelectedImg();
    }
  }
}

export class King extends Piece {
    name = "王将";
    promoted_name = "王将";
    clicked = false;
    canMoveTo(position: Position) {
      const distance = this.position.distanceFrom(position);
      return (
        !(distance.file == 0 && distance.rank == 0) &&
        Math.abs(distance.file) < 2 &&
        Math.abs(distance.rank) < 2
      );
    }
    movablePlace(board: BoardDomain): void {
    }
  }
  
export class Rook extends Piece {
    name = "飛車";
    promoted_name = "竜王";
    clicked = false;
    canMoveTo(position: Position) {
      const distance = this.position.distanceFrom(position);
      const ownPosition = !(distance.file == 0 && distance.rank == 0);
      const defaultMovable = ownPosition && ( distance.file == 0 || distance.rank == 0 );
      const promotedMovable = ownPosition && ( ( distance.file == 0 || distance.rank == 0 ) || (Math.abs(distance.file) < 2 && Math.abs(distance.rank) < 2));
      return this.promoted ? promotedMovable : defaultMovable;
    }
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
  }
  
export class Bishop extends Piece {
    name = "角行";
    promoted_name = "竜馬";
    clicked = false;
    canMoveTo(position: Position) {
      const distance = this.position.distanceFrom(position);
      const ownPosition = !(distance.file == 0 && distance.rank == 0);
      const defaultMovable = ownPosition && ( Math.abs(distance.file) == Math.abs(distance.rank) );
      const promotedMovable = ownPosition && ( Math.abs(distance.file) == Math.abs(distance.rank) || (Math.abs(distance.file) < 2 && Math.abs(distance.rank) < 2));
      return this.promoted ? promotedMovable : defaultMovable;
    }
  }
  
export class SilverGeneral extends Piece {
    name = "銀将";
    promoted_name = "成銀";
    clicked = false;
    canMoveTo(position: Position) {
      const distance = this.position.distanceFrom(position);
      const val = this.own ? -1 : 1;
      return this.promoted
        ? this.defaultCanMoveTo(position)
        : (distance.rank == val && Math.abs(distance.file) < 2) ||
            (distance.rank == -val &&
              (distance.file == -1 || distance.file == 1));
    }
  }
  
export class Knight extends Piece {
    name = "桂馬";
    promoted_name = "成桂";
    clicked = false;
    canMoveTo(position: Position) {
      const distance = this.position.distanceFrom(position);
      const val = this.own ? -2 : 2;
      return (
        (distance.rank == val && distance.file == -1) ||
        (distance.rank == val && distance.file == 1)
      );
    }
  }
  
export class Lance extends Piece {
    name = "香車";
    promoted_name = "成香";
    clicked = false;
    canMoveTo(position: Position) {
      const distance = this.position.distanceFrom(position);
      const val = this.own ? distance.rank < 0 : distance.rank > 0;
      return val && distance.file == 0;
    }
  }
  
export class Pawn extends Piece {
    name = "歩兵";
    promoted_name = "と金";
    clicked = false;
    canMoveTo(position: Position) {
      const distance = this.position.distanceFrom(position);
      const val = this.own ? -1 : 1;
      return distance.rank == val && distance.file == 0;
    }
  }
  
export class NullPiece extends Piece {
    name = "";
    promoted_name = "";
    disabled = true;
    clicked = false;
    canMoveTo(position: Position) {
      console.log(position);
      return false;
    }
  }