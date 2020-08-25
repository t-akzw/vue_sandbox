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

export type HoldingDomain = Piece[];

export class Holding {
  static my: Piece[];
  static op: Piece[];
  private static opHolding() {
    this.my = [ new Lance(0, 0, true), new Lance(0, 0, false) ]
  }
  private static myHolding() {
    this.op = [ new Pawn(0, 0, true), new Lance(0, 0, false) ]
  }
}

