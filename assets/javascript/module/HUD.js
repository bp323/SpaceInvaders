/**
 * Created by stryker on 2014.03.05..
 */
define(function(){
    //Private variables
    var _game = null,
        _health = null,
        _healthText = null,
        _lives = null,
        _livesText = null,
        _score = null,
        _scoreText = null,
        _stateText = null;

    return{
        init: function(game){
            _game = game;
        },
        getScore: function() {
            return parseInt(_score, 10);
        },
        preload: function(){
            //_game.load.image('ship', 'assets/img/player.png');
        },
        createStat: function(score,health,lives){
            _score = score;
            _scoreText = _game.add.text(10, 10, "Score: " + score, { fontSize: '34px', fill: '#fff' });
            _health = health;
            _healthText = _game.add.text(10, 50, "Health: " + health, { fontSize: '34px', fill: '#fff' });
            _lives = lives;
            _livesText = _game.add.text(10, 90, "Lives: " + lives, { fontSize: '34px', fill: '#fff' });

            //_stateText.visible = false;
        },
        updateHealthText: function(health){
            _healthText.text = "Health: "+health;
        },
        updateLivesText: function(lives){
            _livesText.text = "Lives: "+lives;
        },
        updateScoreText: function(score){
            _score = _score + score;
            _scoreText.text = "Score: " + _score;
        },
        createTitle: function(title){
            _stateText = _game.add.text(_game.world.centerX,_game.world.centerY,
                                            title,{font: '84px Arial',fill: '#fff', align: "center"});
            _stateText.anchor.setTo(0.5,0.5);
        },
        createScoreBoard: function(scores) {
            _stateText = _game.add.text(_game.world.centerX, 50, 'High scores', {font: '80px Arial', fill: '#FFF', align: "center"});
            _stateText.anchor.setTo(0.5, 0.5);
            for (var i = 0; i < scores.length; i++) {
                _stateText = _game.add.text(220, 100 + ((i + 1) * 30), (i + 1) + '   ' + scores[i].displayName, {font: '20px Arial', fill: '#FFF'});
                _stateText = _game.add.text(530, 100 + ((i + 1) * 30), scores[i].score, {font: '20px Arial', fill: '#FFF'});
            }
            _stateText = _game.add.text(_game.world.centerX, 500, 'Press A to play', {font: '80px Arial', fill: '#FFF', align: "center"});
            _stateText.anchor.setTo(0.5, 0.5);
        }
    };
});