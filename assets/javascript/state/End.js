/**
 * Created by stryker on 2014.03.22..
 */
define(['module/HUD'],function(HUD){
    var _game = null,
        _nextState = null;
    
    var _End = {
        create: function(){
            HUD.createTitle('  Game Over \n Press A');

            /**
             * Show the scores after `A` was pressed on the controller.
             * Unbind the `A` button before continuing.
             *
             * @param  {Object}    pushData    Data associated to the push event
             */
            var showScores = function(pushData) {
                _game.pushChannel.unbind('press_a', showScores);
                _game.state.start(_nextState);
            };

            // Show the highscores once the A button was pressed
            _game.pushChannel.bind('press_a', showScores);

            //Starting the Play state after the spacebar is down
            // _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(function(){
            //     _game.state.start(_nextState);
            // });
        }
    }
    
    return{
        init: function(game,nextState){
            _game = game;
            _nextState = nextState;
        },
        getEndState: function(){
            return (_End);
        }
    }
})