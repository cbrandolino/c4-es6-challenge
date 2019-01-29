import test from 'tape';
import BoardModel from '../src/lib/BoardModel.es6';
import Ai from '../src/lib/Ai.es6';
import boardTest from '../test/board.es6';
import aiTest from '../test/ai.es6';
import fixtures from '../test/fixtures.es6';

//boardTest(test, fixtures, BoardModel);
aiTest(Ai, test, fixtures, BoardModel);
