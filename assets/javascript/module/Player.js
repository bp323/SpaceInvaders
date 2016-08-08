/**
 * Created by stryker on 2014.03.05..
 * Player module
 */
define(['module/HUD'],function(HUD){

    //Private Variables
    var _game = null,
        _health = null,
        _lives = null,
        _score = null,
        _firingTime = null,
        _ship = null,
        _buttons = {
            leftPressed: null,
            rightPressed: null
        },
        _bulletGroup = null,
        _bullet = null,
        _explosionGroup = null,
        _explosion = null,
        _alienGroup = null,
        _aliens = null,
        _shootingEvent = null,
        _bulletSpeed = null;

    var _fireBullet = function(){
        _bullet = _bulletGroup.getFirstExists(false);

        if(_bullet){
            //_bullet.lifespan = _game.height / (_bulletSpeed/1000);
            _bullet.checkWorldBounds = true;
            _bullet.reset(_ship.x,_ship.y+8);
            _bullet.body.velocity.y = -_bulletSpeed;
        }
    };

    // Add a postScore function to the global game object
    var postScore = function() {
        $.ajax({
            'url': 'http://localhost:3000/scores',
            'method': 'post',
            'data': {
                'score': {
                    'displayName': 'Bert Pareyn',
                    'score': HUD.getScore()
                }
            },
            'success': function(scores) {
                _game.scoreBoard = scores;
                _game.state.start('Score');
            }
        });
    };

    var _collisionHandler = function(ship,bullet){

        ship.damage(bullet.bulletDamage);

        bullet.kill();
        HUD.updateHealthText(ship.health);
        
        // Ship loses a life
        if (ship.health == 0) {
            this.stopShooting();
            this.unbindPlayerChannelEvents();
            _explosion = _explosionGroup.getFirstExists(false);
            _explosion.reset(_ship.body.x,_ship.body.y);
            _explosion.play('kaboom',30,false,true);
            
            _lives--;
            HUD.updateLivesText(_lives);
            
            //lose life
            if (_lives > 0){          
                this.bindPlayerChannelEvents();
                ship.revive(_health);
                this.startShooting();
            //dead
            }else{
                this.unbindPlayerChannelEvents();
                _game.postScore();
            }
        }

    };


    return {
        init: function(game){
            _game = game;
            _game.postScore = postScore;
        },
        preload: function(){
            _game.load.image('ship', 'assets/img/player.png');
        },
        create: function(configuration){
            _ship = _game.add.sprite(400,500,'ship');
            _ship.anchor.setTo(0.5,0.5);
            _game.physics.enable(_ship,Phaser.Physics.ARCADE);
            _ship.body.collideWorldBounds = true;
            _ship.health = configuration.health;
            _health = configuration.health;
            _lives = configuration.lives;
            _score = configuration.score;
            _firingTime = configuration.firingTime;
            _bulletSpeed = configuration.bulletSpeed;

            // _cursors = _game.input.keyboard.createCursorKeys();
            
            // Subscribe to left and right key presses and releases
            this.bindPlayerChannelEvents();
        },
        update: function() {
            _ship.body.velocity.setTo(0,0);

            if(_buttons.leftPressed){
                _ship.body.velocity.x = -200;
            }else if(_buttons.rightPressed){
                _ship.body.velocity.x = 200;
            }
        },
        bindPlayerChannelEvents: function() {
            _game.pushChannel.bind('press_l', this.pressedLeft.bind(this));
            _game.pushChannel.bind('release_l', this.releasedLeft.bind(this));
            _game.pushChannel.bind('press_r', this.pressedRight.bind(this));
            _game.pushChannel.bind('release_r', this.releasedRight.bind(this));
        },
        unbindPlayerChannelEvents: function() {
            _game.pushChannel.unbind('press_l', this.pressedLeft.bind(this));
            _game.pushChannel.unbind('release_l', this.releasedLeft.bind(this));
            _game.pushChannel.unbind('press_r', this.pressedRight.bind(this));
            _game.pushChannel.unbind('release_r', this.releasedRight.bind(this));
        },
        pressedLeft: function(pushData) {
            _buttons.rightPressed = false;
            _buttons.leftPressed = true;
            this.update();
        },
        releasedLeft: function(pushData) {
            _buttons.leftPressed = false;
            this.update();
        },
        pressedRight: function(pushData) {
            _buttons.leftPressed = false;
            _buttons.rightPressed = true;
            this.update();
        },
        releasedRight: function(pushData) {
            _buttons.rightPressed = false;
            this.update();
        },
        setBulletGroup: function(bullets){
            _bulletGroup = bullets.getBulletGroup();
        },
        getBulletGroup: function(){
            return _bulletGroup;
        },
        setExplosionGroup: function(explosions){
            _explosionGroup = explosions.getExplosionGroup();
        },
        startShooting: function(){
            _shootingEvent = _game.time.events.loop(_firingTime,_fireBullet,this);
        },
        stopShooting: function(){
            _game.time.events.remove(_shootingEvent);
        },
        getPlayerShip: function(){
            return _ship;
        },
        createOverLap: function(bulletGroup){
            _game.physics.arcade.overlap(_ship,bulletGroup,_collisionHandler,null,this);
        },
        setAliensAndAlienGroup: function(aliens){
            _aliens = aliens;
            _alienGroup=aliens.getAlienGroup();
        }
    };
});