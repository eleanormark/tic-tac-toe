describe("Player", function() {
  it("has a Player prototype", function() {
    Player.should.exist;
  });
  it("has a mark", function() {
    var player = Object.create(Player);
    player.setMark("x");
    player.mark.should.equal("x");
  });
});

describe("Game", function() {
  it("has a Game prototype", function() {
    Game.should.exist;
  });

  it("initializes a board with no marks", function() {
    var game = Object.create(Game);
    game.initialize();
    game.board.should.eql([]);
  });

  it("creates two players", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    game.players.length.should.equal(2);
  });

  it("sets the current player after createing players", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    var player = game.players[0];
    game.currentPlayer.should.equal(player);
  });

  it("lets current player mark a square", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    game.makeMark(0);
    game.board[0].should.equal("X");
  });

  it("sets the next player to the current Player", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    game.makeMark(1);
    var player = game.players[0];
    game.currentPlayer.should.equal(player);
    game.makeMark(2);
    game.board[2].should.equal("O");
    game.makeMark(3);
    game.board[3].should.equal("X");
  });

  it("returns true when all the squares are marked", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    for (i = 0; i < 9; i++){
      game.makeMark(i);
    }
    game.isFull().should.be.true;
  });

  it("returns false when a square is unmarked", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    for (i = 0; i < 8; i++){
      game.makeMark(i);
    }
    game.board[8] = undefined;
    game.isFull().should.be.false;
  });

  it("returns true when there are three same marks in a row", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    for (i = 0; i < 7; i++){
      game.makeMark(i);
    }
    game.hasWinner().should.be.true;
  });

  it("returns false when there are no three same marks in a row", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    for (i = 0; i < 6; i++){
      game.makeMark(i);
    }
    game.hasWinner().should.be.false;
  });

  it("returns the winner when there are three same marks in a row", function() {
    var game = Object.create(Game);
    game.initialize();
    game.createPlayers();
    for (i = 0; i < 7; i++){
      game.makeMark(i);
    }
    game.theWinner().should.equal("X");
  });

});





