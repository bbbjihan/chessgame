import { Player } from "./Player";

export abstract class ChessPiece {
  constructor(
    protected pieceType: string,
    protected position: number[][],
    protected canMove: number[][][],
    protected owner: Player
  ){}
}

export class Pawn extends ChessPiece {

}

export class Knight extends ChessPiece {

}

export class Bishop extends ChessPiece {

}

export class Rook extends ChessPiece {

}

export class Queen extends ChessPiece {

}

export class King extends ChessPiece {

}