/**
 * Created by stryker on 2014.03.22..
 */
define(['module/HUD'],function(HUD){
    var _game = null,
        _nextState = null,
        _activationKey = null;
    
    //Start State
    var _Start = {                    
        create: function(){
            //creating the titel screen
            HUD.createTitle(' Space Invader \n Press A');
            
            // Set up the Physics for the game
            _game.physics.startSystem(Phaser.Physics.ARCADE);

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

            //Starting the next state(Play) after the spacebar is down
            // _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(function(){
            //     _game.state.start(_nextState);
            // });
        }
    };

    return{
        init: function(game,nextState){
            _game = game;
            _nextState = nextState;
        },
        getStartState: function(){
            return(_Start);
        }

    }
})