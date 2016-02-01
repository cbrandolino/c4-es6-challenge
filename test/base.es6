import test from 'tape';
import fixtures from '../test/fixtures.es6';
import BoardModel from '../src/lib/BoardModel.es6';

test('BoardModel Creation', (t) => {
  const board = new BoardModel();
  t.plan(2);
  t.ok(board);
  t.same(board.state, fixtures.boards.base);
});

test('Player setup', (t) => {
  t.comment(`Players are indicated con 1 e -1 for flippability
    and potential in for cost/search algos`);
  const board = new BoardModel();
  t.plan(4);
  t.equal(board.currentPlayer, 1);
  t.equal(board.nextPlayer, -1);
  t.equal(board.changePlayer(), -1);
  t.equal(board.currentPlayer, -2);
});

test('BoardModel Update', (t) => {
  const board = new BoardModel();
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
  const board = new BoardModel();
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
  const board = new BoardModel();
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
  const board = new BoardModel();
  container.test('Full-column edge cases', (t) => {
    t.plan(5);
    board.state = fixtures.boards.noSpaceCol2;
    board.on('fullCol', () =>
      t.pass('Emit event signaling col is full')
    );
    const moveResult = board.play(2);
    t.comment('do not change cell ownership');
    t.equal(board.cellValue(5, 2), -1);
    t.comment('do not swap player');
    t.equal(board.currentPlayer, 1);
    t.comment('Return unchanged cell');
    t.not(moveResult);
  });
  container.test('Full-board edge cases', (t) => {
    board.state = fixtures.boards.full;
    t.plan(2);
    t.throws(board.play(1));
    board.on('fullBoardModel', () =>
      t.pass('Emit event signaling board is full')
    );
  });
});
