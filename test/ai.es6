const aiTest = (Ai, test, fixtures, BoardModel) => {
  const makeBoard = (fixture) => {
    const board = new BoardModel();
    board.state = fixtures.boards[fixture].map(a => a.slice());
    return board;
  };

  const makeTestMap = (remove = [], change = new Map()) => {
    const map = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]);
    remove.forEach((item) => map.delete(item));
    change.forEach((item, key) => map.set(key, item));
    return map;
  };

  test('Object Creation', (t) => {
    t.plan(1);
    const ai = new Ai();
    t.same(ai.depth, 6);
  });

  test('Empty scores array', (t) => {
    t.plan(2);
    const ai = new Ai();
    t.same(ai.emptyScoresMap(makeBoard('base')), makeTestMap(),
      'Create a map containing (col, 0) for each column'
    );
    t.same(ai.emptyScoresMap(makeBoard('noSpaceCol2')), makeTestMap([2]),
      'If a column is full, do not include it in the map'
    );
  });

  test('Determine move value', (t) => {
    t.plan(2);
    let ai = new Ai(1);
    t.equal(ai.getMoveScore(makeBoard('oneWillWinWithCol4'), 4, 0), 1,
      'If AI wins with one move, assign 1 to such move'
    );
    ai = new Ai(-1);
    t.equal(ai.getMoveScore(makeBoard('oneWillWinWithCol4'), 4, 0), -1,
      'If AI loses with one move, assign -1 to such move'
    );
  });

  test('Determine max move value', (t) => {
    t.plan(2);
    const ai = new Ai(1, makeBoard('oneWillWinWithCol4'));
    t.equal(ai.getMaxMoveScore(), '4',
      'Winning move has max value'
    );
  });
};

export default aiTest;
