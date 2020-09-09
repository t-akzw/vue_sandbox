export type File = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // 筋 Col
export type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // 段 Row

export class Position {
  // 駒の座標
  constructor(private file: File, private rank: Rank) {}
  getFile() {
    return this.file
  }
  getRank() {
    return this.rank
  }
  distanceFrom(position: Position) {
    return {
      rank: position.rank - this.rank,
      file: position.file - this.file
    };
  }
  getArrayPosition(r: number, f: number) {
    return {
      rank: (this.rank + r) - 1,
      file: 9 - (this.file + f)
    }
  }
}