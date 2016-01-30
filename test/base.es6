import test from 'tape';
import fixtures from '../test/fixtures.es6';
import Board from '../src/lib/Board.es6';

test('Board Creation', (t) => {
  const board = new Board();
  t.plan(2);
  t.ok(board);
  t.same(board.state, fixtures.boards.base);
});

test('Player setup', (t) => {
  t.comment(`Players are indicated con 1 e -1 for flippability
    and potential in for cost/search algos`);
  const board = new Board();
  t.plan(4);
  t.equal(board.currentPlayer, 1);
  t.equal(board.nextPlayer, -1);
  t.equal(board.changePlayer(), -1);
  t.equal(board.currentPlayer, -2);
});

test('Board Update', (t) => {
  const board = new Board();
  let moveResult = board.play(0);
  t.plan(5);
  t.comment('A throw is executed on a column');
  t.comment('A thrown in a column should reach its lowest free cell');
  t.same(moveResult, { col: 0, row: 0, player: 1 });
  t.comment('Player should switch automatically after one throw');
  t.equals(board.currentPlayer, -1);
  t.same(board.state, fixtures.boards.first);
  moveResult = board.play(1);
  t.same(moveResult, { col: 1, row: 0, player: -1 });
  t.same(board.state, fixtures.boards.second);
});

test('Vector check', (t) => {
  t.plan(5);
  const board = new Board();
  t.comment('Vertical');
  board.state = fixtures.boards.oneWins;
  t.comment('Returns true if there are four repeated elements of a certain type');
  t.ok(board.checkVector(5, 2, 1, 0));
  t.comment('Returns false if there are four repeated elements of a certain type');
  t.notOk(board.checkVector(5, 3, 1, 0));
  t.comment('Horizontal');
  board.state = fixtures.boards.oneIsJustChillin;
  t.comment('Returns true if there are four repeated elements of a certain type');
  t.ok(board.checkVector(0, 1, 0, 1));
  t.comment('Returns false if there are four repeated elements of a certain type');
  t.notOk(board.checkVector(1, 1, 0, 1));
  t.comment('Diagonal');
  board.state = fixtures.boards.minusOneWins;
  board.changePlayer();
  t.comment('Returns true if there are four repeated elements of a certain type');
  t.ok(board.checkVector(0, 2, 1, 1));
});

test('Victory detection', (t) => {
  t.plan(3);
  const board = new Board();
  board.state = fixtures.boards.oneWins;
  t.comment('Victory');
  t.ok(board.checkVictory(5, 2));
  t.comment('No Victory');
  t.notOk(board.checkVictory(5, 3));
  t.comment('Victory after move');
  board.state = fixtures.boards.oneWillWinWithCol4;
  board.play(4);
  t.equal(board.winner, 1);
});

test('Edge cases/Final states', (container) => {
  const board = new Board();
  container.test('Full-column edge cases', (t) => {
    board.state = fixtures.boards.noSpaceCol2;
    moveResult = board.play(1);
    t.comment('do not change cell ownership');
    t.same(git);
    t.comment('do not swap player');
    t.comment('Return unchanged cell');
    t.comment('Emit event signaling col is full');
  });
  container.test('Full-board edge cases', (t) => {
    board.state = fixtures.boards.full;
    board.play = 1;
    t.comment('do not change cell ownership');
    t.comment('do not swap player');
    t.comment('Return unchanged cell');
    t.comment('Emit event signaling board is full');
  });
  container.test('After victory', (t) => {
    board.state = fixtures.boards.oneWins;
    t.comment('no further moves are possible');
    t.comment('attempts to new moves will throw exception');
    t.comment('a score is given');
  });
});
