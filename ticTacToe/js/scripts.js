var Player = {

  setMark:function(mark) {
    this.mark = mark;
  }
};

var Game = {

  initialize: function() {
    this.board = [];
    this.players = [];
  },
  createPlayers: function() {
    for (var i = 0; i < 2; i++){
      var player = Object.create(Player);
      this.players.push(player);
    }
    this.players[0].setMark("X");
    this.players[1].setMark("O");
    this.currentPlayer = this.players[0];
  },
  nextPlayer: function() {
    this.currentPlayer = this.players.pop();
    this.players.unshift(this.currentPlayer)
  },

  makeMark: function(index) {
    if (typeof this.board[index] === 'undefined'){
      this.board[index] = this.currentPlayer.mark;
      this.nextPlayer();
      return this.board[index];
    }
  },

  isFull: function() {
    XOList = this.board.filter(function(val) {
      return val !== undefined
    });
    return XOList.length === 9
    
  },

  hasWinner: function() {
    return  ((this.board[0]===this.board[1] && this.board[1]===this.board[2]) && this.board[2] !== undefined ||
        (this.board[3]===this.board[4] && this.board[4]===this.board[5]) && this.board[5] !== undefined ||
        (this.board[6]===this.board[7] && this.board[7]===this.board[8]) && this.board[8] !== undefined ||
        (this.board[0]===this.board[3] && this.board[3]===this.board[6]) && this.board[6] !== undefined ||
        (this.board[1]===this.board[4] && this.board[4]===this.board[7]) && this.board[7] !== undefined ||
        (this.board[2]===this.board[5] && this.board[5]===this.board[8]) && this.board[8] !== undefined ||
        (this.board[0]===this.board[4] && this.board[4]===this.board[8]) && this.board[8] !== undefined ||
        (this.board[2]===this.board[4] && this.board[4]===this.board[6]) && this.board[6] !== undefined );
  }
};

$(document).ready(function() {
  var game = Object.create(Game);
  var initializeGame = function() {
    $('#play').hide();
    $('div.square').empty();
    game.initialize();
    game.createPlayers();
   };

  var playGame = function() { 
    initializeGame();
    $("div.square").click(function() {
      if ($(this).text() ==="") {
        $(this).text(game.makeMark(this.id));
        if (game.hasWinner()) {
          alert("Player " + game.players[1].mark + "  is the winner!");
          $('div.square').unbind('click');
          $('#play').show().click(function() {
            playGame();
          });
        }
        else if (game.isFull()) {
          alert("Tie Game!");
          $('div.square').unbind('click');
          $('#play').show().click(function() {
            playGame();
          });
        }
      }
    });
  };
  playGame();
});



