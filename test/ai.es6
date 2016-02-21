const aiTest = (Ai, test, fixtures, BoardModel) => {

  const makeBoard = (fixture) => {
    const board = new BoardModel();
    board.state = fixtures.boards[fixture];
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

  test('Determine scores for next move', (t) => {
    t.plan(2);
    const ai = new Ai(1);
    t.same(ai.getScores(makeBoard('oneWillWinWithCol4')), [0, 0, 0, 0, 1, 0, 0],
      'If AI wins with one move, assign 1 to such move'
    );
    t.same(ai.getScores(makeBoard('base')), [0, 0, 0, 0, 0, 0, 0],
      'If no player wins with one move, assign 0 to all moves'
    );
  });
};

export default aiTest;
