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
  const board = new Board();
  t.plan(4);
  t.equal(board.currentPlayer, 1);
  t.equal(board.nextPlayer, -1);
  t.equal(board.changePlayer(), -1);
  t.equal(board.currentPlayer, -1);
});

test('Board Update', (t) => {
  const board = new Board();
  t.same(board.play(0), 0);
  t.same(board.state, fixtures.boards.base);
});
