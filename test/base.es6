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
  t.equal(board.currentPlayer, -1);
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

test('Repetition test', (t) => {
  t.plan(2);
  const board = new Board();
  t.comment('Returns true if there are four repeated elements of a certain type');
  t.ok(board.checkRepeatedElements(1, [0, 0, 0, 1, 1, 1, 1, 0]));
  t.comment('Returns false if there aren\'t four repeated elements of a certain type');
  t.notOk(board.checkRepeatedElements(1, [0, 0, 0, 0, 1, 1, 1, 0]));
});

test('Victory detection', (t) => {
  t.plan(3);
  const breaktures = Object.assign({}, fixtures);
  const board = new Board();
  t.comment('Vertical');
  board.state = breaktures.minusOneWins;
  t.comment('Determine win from winning configuration + last moveResult');
  t.ok(board.checkGoalState({ col: 0, row: 0, player: -1 }));
  board.state = breaktures.oneIsJustChillin;
  t.comment('Horizontal');
  t.ok(board.checkGoalState({ col: 0, row: 0, player: 1 }));
  t.comment('Diagonal');
  breaktures.oneWillWinWithCol4[4][3] = 1;
  t.ok(board.checkGoalState({ col: 1, row: 3, player: 1 }));
});

test('Edge edge/Final states', (container) => {
  const board = new Board();
  container.test('Full-column edge cases', (t) => {
    board.state = fixtures.noSpaceCol2;
    board.play = 1;
    t.comment('do not change cell ownership');
    t.comment('do not swap player');
    t.comment('Return unchanged cell');
    t.comment('Emit event signaling col is full');
  });
  container.test('Full-board edge cases', (t) => {
    board.state = fixtures.full;
    board.play = 1;
    t.comment('do not change cell ownership');
    t.comment('do not swap player');
    t.comment('Return unchanged cell');
    t.comment('Emit event signaling board is full');
  });
  container.test('After victory', (t) => {
    board.state = fixtures.oneWins;
    t.comment('no further moves are possible');
    t.comment('attempts to new moves will throw exception');
    t.comment('a score is given');
  });
});
