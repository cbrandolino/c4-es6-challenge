import test from 'tape';
import Board from '../src/lib/Board.es6';

test('Board Creation', (t) => {
  const board = new Board();
  t.plan(1);
  t.same(board.state, [1, 1, 1, 1, 1, 1]);
});
