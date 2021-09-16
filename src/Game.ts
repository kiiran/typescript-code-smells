export enum Symbol {
  X = 'X',
  O = 'O',
  EMPTY = ' ',
}

type SymbolValue = `${Symbol}`

export class Game {
  private _lastSymbol: SymbolValue = Symbol.EMPTY
  private _board: Board = new Board()
  private winner: SymbolValue | undefined

  public Play(tile: Tile): void {
    if (!!this.winner) {
      throw new Error('someone already won')
    }

    if (this.isFirstMove() && !this.isValidFirstPlayer(tile.Symbol)) {
      throw new Error('Player X should go first')
    }

    if (!this.isValidMove(tile.Symbol)) {
      throw new Error('Invalid next player')
    }

    this.updateGameState(tile)
  }

  public Winner(): SymbolValue | undefined {
    return this.winner
  }

  private checkForWinner(): void {
    const rowColumnIndexes: PositionIndex[] = [0, 1, 2]

    const didLastPlayerWin = rowColumnIndexes.some((index) => {
      return (
        this._board.hasPlayerFilledRow(this._lastSymbol, index) ||
        this._board.hasPlayerFilledColumn(this._lastSymbol, index) ||
        this._board.hasPlayerFilledADiagonal(this._lastSymbol)
      )
    })

    if (didLastPlayerWin) {
      this.winner = this._lastSymbol
    }
  }

  private isValidMove = (symbol: SymbolValue) => this._lastSymbol !== symbol

  private isValidFirstPlayer = (symbol: SymbolValue) => symbol === Symbol.X

  private isFirstMove = () => this._lastSymbol == Symbol.EMPTY

  private updateGameState(tile: Tile) {
    this._lastSymbol = tile.Symbol
    this._board.AddTile(tile)

    this.checkForWinner()
  }
}

type PositionIndex = 0 | 1 | 2

interface Tile {
  X: PositionIndex
  Y: PositionIndex
  Symbol: `${Symbol}`
}

const INITIAL_BOARD: Tile[] = [
  { X: 0, Y: 0, Symbol: Symbol.EMPTY },
  { X: 0, Y: 1, Symbol: Symbol.EMPTY },
  { X: 0, Y: 2, Symbol: Symbol.EMPTY },
  { X: 1, Y: 0, Symbol: Symbol.EMPTY },
  { X: 1, Y: 1, Symbol: Symbol.EMPTY },
  { X: 1, Y: 2, Symbol: Symbol.EMPTY },
  { X: 2, Y: 0, Symbol: Symbol.EMPTY },
  { X: 2, Y: 1, Symbol: Symbol.EMPTY },
  { X: 2, Y: 2, Symbol: Symbol.EMPTY },
]

class Board {
  private _tiles: Tile[] = INITIAL_BOARD

  public TileAt(x: PositionIndex, y: PositionIndex): Tile {
    const tile = this._tiles.find((t: Tile) => t.X == x && t.Y == y)
    if (!tile) {
      throw new Error(`No tile at ${x},${y}`)
    }
    return tile
  }

  public AddTile(tile: Tile) {
    const existingTile = this.TileAt(tile.X, tile.Y)

    if (existingTile.Symbol !== Symbol.EMPTY) {
      throw new Error('Space already filled')
    }

    this.updateTiles(tile)
  }

  public hasPlayerFilledRow(symbol: SymbolValue, row: PositionIndex) {
    const tiles = this.tilesAtRow(row)

    return this.doAllTilesMatchSymbol(tiles, symbol)
  }

  public hasPlayerFilledColumn(symbol: SymbolValue, column: PositionIndex) {
    const tiles = this.tilesAtColumn(column)

    return this.doAllTilesMatchSymbol(tiles, symbol)
  }

  public hasPlayerFilledADiagonal(symbol: SymbolValue) {
    const topLeftToBottomRight = [
      this.TileAt(0, 0),
      this.TileAt(1, 1),
      this.TileAt(2, 2),
    ]
    const topRightToBottomLeft = [
      this.TileAt(0, 2),
      this.TileAt(1, 1),
      this.TileAt(2, 0),
    ]

    return (
      this.doAllTilesMatchSymbol(topLeftToBottomRight, symbol) ||
      this.doAllTilesMatchSymbol(topRightToBottomLeft, symbol)
    )
  }

  private tilesAtRow = (row: PositionIndex) => {
    return [this.TileAt(row, 0), this.TileAt(row, 1), this.TileAt(row, 2)]
  }

  private tilesAtColumn = (col: PositionIndex) => {
    return [this.TileAt(0, col), this.TileAt(1, col), this.TileAt(2, col)]
  }

  private doAllTilesMatchSymbol = (tiles: Tile[], symbol: SymbolValue) =>
    tiles.every((tile) => tile.Symbol === symbol)

  private updateTiles(tile: Tile) {
    this._tiles = this._tiles.map((existingTile) => {
      if (existingTile.X === tile.X && existingTile.Y === tile.Y) {
        return tile
      }

      return existingTile
    })
  }
}
