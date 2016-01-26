import test from 'tape';
import fixtures from '../test/fixtures.es6';
import Board from '../src/lib/Board.es6';

const board = new Board();

test('Board Creation', (t) => {
  t.plan(2);
  t.same(board.state, fixtures.boards.base);
});
