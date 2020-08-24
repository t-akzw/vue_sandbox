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

export type BoardDomain = { key: { key: Piece } };

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
                9: new Lance(9, 1, false)
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
            9: new NullPiece(9, 2, false)
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
            9: new Pawn(9, 3, false)
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
            9: new NullPiece(9, 4, false)
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
            9: new NullPiece(9, 5, false)
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
            9: new NullPiece(9, 6, false)
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
            9: new Pawn(9, 7, true)
          },
          8: {
            1: new NullPiece(1, 8, true),
            2: new Bishop(2, 8, true),
            3: new NullPiece(3, 8, true),
            4: new NullPiece(4, 8, true),
            5: new NullPiece(5, 8, true),
            6: new NullPiece(6, 8, true),
            7: new NullPiece(7, 8, true),
            8: new Rook(8, 8, true),
            9: new NullPiece(9, 8, false)
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
            9: new Lance(9, 9, true)
          }
        };
    }

}

