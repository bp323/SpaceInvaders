/**
 * Created by stryker on 2014.03.05..
 */
require(['state/Load','state/Start','state/Play','state/Score','state/End','lib/phaser-no-physics.min', 'https://js.pusher.com/3.2/pusher.min.js'],function(Load,Start,Play,Score,End){

    var _game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    // Enable pusher logging
    Pusher.logToConsole = true;

    // Load state
    Load.init(_game, 'Start'); //args: game object, next state
    _game.state.add('Load',Load.getLoadState()); //args: state name, geting the load state
    
    //Start State
    Start.init(_game, 'Play');
    _game.state.add('Start',Start.getStartState());
    
    // Play State
    Play.init(_game,'Score');
    _game.state.add('Play',Play.getPlayState());
    
    // Score state
    Score.init(_game, 'Play');
    _game.state.add('Score', Score.getScoreState());

    //Starting the Load state
    _game.state.start('Load');
    
    // Initialize websockets and add functions to the _game object
    _game.pusher = new Pusher('bb2a1923d9cf75f8fec1', {
        cluster: 'eu',
        encrypted: false
    });

    // Subscribe to the controller's channel
    _game.pushChannel = _game.pusher.subscribe('gpio_channel');
});
