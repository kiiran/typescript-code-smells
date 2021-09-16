import { Game } from './Game'

describe('TicTacToe game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  it('should not allow player O to play first', () => {
    expect(() => game.Play({ Symbol: 'O', X: 0, Y: 0 })).toThrow()
  })

  it('should not allow player x to play twice in a row', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    expect(() => game.Play({ Symbol: 'X', X: 1, Y: 0 })).toThrow()
  })

  it('should not allow a player to play in last played position', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    expect(() => game.Play({ Symbol: 'O', X: 0, Y: 0 })).toThrow()
  })

  it('should not allow a player to play in any played position', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    game.Play({ Symbol: 'O', X: 1, Y: 0 })
    expect(() => game.Play({ Symbol: 'X', X: 0, Y: 0 })).toThrow()
  })

  it('should declare player X as winner if it plays three in top row', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    game.Play({ Symbol: 'O', X: 1, Y: 0 })
    game.Play({ Symbol: 'X', X: 0, Y: 1 })
    game.Play({ Symbol: 'O', X: 1, Y: 1 })
    game.Play({ Symbol: 'X', X: 0, Y: 2 })

    var winner = game.Winner()

    expect(winner).toBe('X')
  })

  it('should declare player O as winner if it plays three in top row', () => {
    game.Play({ Symbol: 'X', X: 1, Y: 0 })
    game.Play({ Symbol: 'O', X: 0, Y: 0 })
    game.Play({ Symbol: 'X', X: 1, Y: 1 })
    game.Play({ Symbol: 'O', X: 0, Y: 1 })
    game.Play({ Symbol: 'X', X: 2, Y: 2 })
    game.Play({ Symbol: 'O', X: 0, Y: 2 })

    var winner = game.Winner()

    expect(winner).toBe('O')
  })

  it('should declare player X as winner if it plays three in middle row', () => {
    game.Play({ Symbol: 'X', X: 1, Y: 0 })
    game.Play({ Symbol: 'O', X: 0, Y: 0 })
    game.Play({ Symbol: 'X', X: 1, Y: 1 })
    game.Play({ Symbol: 'O', X: 0, Y: 1 })
    game.Play({ Symbol: 'X', X: 1, Y: 2 })

    var winner = game.Winner()

    expect(winner).toBe('X')
  })

  it('should declare player O as winner if it plays three in middle row', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    game.Play({ Symbol: 'O', X: 1, Y: 0 })
    game.Play({ Symbol: 'X', X: 2, Y: 1 })
    game.Play({ Symbol: 'O', X: 1, Y: 1 })
    game.Play({ Symbol: 'X', X: 2, Y: 2 })
    game.Play({ Symbol: 'O', X: 1, Y: 2 })

    var winner = game.Winner()

    expect(winner).toBe('O')
  })

  it('should declare player X as winner if it plays three in bottom row', () => {
    game.Play({ Symbol: 'X', X: 2, Y: 0 })
    game.Play({ Symbol: 'O', X: 0, Y: 0 })
    game.Play({ Symbol: 'X', X: 2, Y: 1 })
    game.Play({ Symbol: 'O', X: 0, Y: 1 })
    game.Play({ Symbol: 'X', X: 2, Y: 2 })

    var winner = game.Winner()

    expect(winner).toBe('X')
  })

  it('should declare player O as winner if it plays three in bottom row', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    game.Play({ Symbol: 'O', X: 2, Y: 0 })
    game.Play({ Symbol: 'X', X: 1, Y: 1 })
    game.Play({ Symbol: 'O', X: 2, Y: 1 })
    game.Play({ Symbol: 'X', X: 0, Y: 1 })
    game.Play({ Symbol: 'O', X: 2, Y: 2 })

    var winner = game.Winner()

    expect(winner).toBe('O')
  })

  it('should declare player X as winner if it plays three in left column', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    game.Play({ Symbol: 'O', X: 0, Y: 1 })
    game.Play({ Symbol: 'X', X: 1, Y: 0 })
    game.Play({ Symbol: 'O', X: 1, Y: 1 })
    game.Play({ Symbol: 'X', X: 2, Y: 0 })

    var winner = game.Winner()

    expect(winner).toBe('X')
  })

  it('should declare player O as winner if it plays three in left column', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 1 })
    game.Play({ Symbol: 'O', X: 0, Y: 0 })
    game.Play({ Symbol: 'X', X: 1, Y: 1 })
    game.Play({ Symbol: 'O', X: 1, Y: 0 })
    game.Play({ Symbol: 'X', X: 2, Y: 2 })
    game.Play({ Symbol: 'O', X: 2, Y: 0 })

    var winner = game.Winner()

    expect(winner).toBe('O')
  })

  // TODO: possible other winning on columns scenarios

  it('should declare player X as winner if it plays three in top-left to bottom-right diagonal', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    game.Play({ Symbol: 'O', X: 0, Y: 1 })
    game.Play({ Symbol: 'X', X: 1, Y: 1 })
    game.Play({ Symbol: 'O', X: 1, Y: 2 })
    game.Play({ Symbol: 'X', X: 2, Y: 2 })

    var winner = game.Winner()

    expect(winner).toBe('X')
  })

  it('should declare player X as winner if it plays three in top-right to bottom-left diagonal', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 2 })
    game.Play({ Symbol: 'O', X: 0, Y: 1 })
    game.Play({ Symbol: 'X', X: 1, Y: 1 })
    game.Play({ Symbol: 'O', X: 1, Y: 2 })
    game.Play({ Symbol: 'X', X: 2, Y: 0 })

    var winner = game.Winner()

    expect(winner).toBe('X')
  })

  it('throws an error if someone tries to play after someone has won', () => {
    game.Play({ Symbol: 'X', X: 0, Y: 0 })
    game.Play({ Symbol: 'O', X: 2, Y: 0 })
    game.Play({ Symbol: 'X', X: 1, Y: 1 })
    game.Play({ Symbol: 'O', X: 2, Y: 1 })
    game.Play({ Symbol: 'X', X: 0, Y: 1 })
    game.Play({ Symbol: 'O', X: 2, Y: 2 })

    expect(() => game.Play({ Symbol: 'X', X: 0, Y: 2 })).toThrow(
      'someone already won',
    )
  })
})
