import test from 'tape';
import BoardModel from '../src/lib/BoardModel.es6';
import boardTest from '../test/board.es6';
import fixtures from '../test/fixtures.es6';

boardTest(test, fixtures, BoardModel);
