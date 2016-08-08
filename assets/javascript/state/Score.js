/**
 * Created by stryker on 2014.03.22..
 */
define(['module/HUD', 'lib/jquery-3.1.0.min'],function(HUD){
    var _game = null,
        _nextState = null;
        _scores = null;
    
    var aliens = null;

    //Playing State
    var _Score = {
        create: function() {
            HUD.createScoreBoard(_game.scoreBoard);

            /**
             * Start the game after `A` was pressed on the controller.
             * Unbind the `A` button before continuing.
             *
             * @param  {[type]} pushData [description]
             *
             * @return {[type]}          [description]
             */
            var startGame = function(pushData) {
                _game.pushChannel.unbind('press_a', startGame);
                _game.state.start(_nextState);
            };

            // Start to play the game once the A button was pressed
            _game.pushChannel.bind('press_a', startGame);
        }
    };
    
    return {
        init: function(game, nextState, scores){
            _game = game;
            _nextState = nextState;
            _scores = scores;
        },
        getScoreState: function(){
            return(_Score);
        }
    };
});