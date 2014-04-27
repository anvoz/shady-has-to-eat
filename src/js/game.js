(function() {
    'use strict';

    function Game() {
        var game = this;

        game.platforms = false;
        game.player = false;
    }

    Game.prototype = {

        preload: function() {
            var game = this;

            game.load.image('background', 'assets/background.png');

            game.load.image('ground', 'assets/ground.png');
            game.load.image('ledge', 'assets/ledge.png');

            game.load.spritesheet('player', 'assets/player.png', 30, 30);
        },

        create: function() {
            var game = this;

            game.cursors = game.input.keyboard.createCursorKeys();

            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 400;

            game.add.sprite(0, 0, 'background');

            game.createPlatforms();
            game.player = Game.Player.create(game, 30, 400);
        },

        update: function() {
            var game = this,
                platforms = game.platforms,
                player = game.player;

            game.physics.arcade.collide(player, platforms);

            Game.Player.update(game, player);
        },

        createPlatforms: function() {
            var game = this,

            // The platforms group contains the ground
            // where the character can jump on
            platforms = game.platforms = game.add.group(),
            ledges = [
                [-150, 348], [90, 348], [330, 348], [570, 348],
                [50, 410], [400, 410]
            ];

            var ledge;
            for (var i = 0; i < ledges.length; i++) {
                ledge = platforms.create(ledges[i][0], ledges[i][1], 'ledge');
                game.physics.arcade.enableBody(ledge);
                ledge.body.allowGravity = false;
                ledge.body.immovable = true;
            }
            var ground = platforms.create(0, 479, 'ground');
            game.physics.arcade.enableBody(ground);
            ground.body.allowGravity = false;
            ground.body.immovable = true;
        }
    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Game = Game;

}());