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
  my: Piece[] = [];
  op: Piece[] = [];
  public opHolding() {
    this.my = [ new Lance(0, 0, true), new Lance(0, 0, false) ]
    return this.my
  }
  public myHolding() {
    this.op = [ new Pawn(0, 0, true), new Lance(0, 0, false) ]
    return this.op
  }
}

