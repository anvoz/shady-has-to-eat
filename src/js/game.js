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
            game.createPlayer();
        },

        update: function() {
            var game = this,
                platforms = game.platforms,
                player = game.player;

            game.physics.arcade.collide(player, platforms);

            player.action();
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
        },
        createPlayer: function() {
            var game = this,
            cursors = game.cursors,

            // Create the player
            player = game.player = game.add.sprite(30, 400, 'player');

            // Player physics properties
            game.physics.arcade.enableBody(player);
            player.body.collideWorldBounds = true;
         
            // Walking left and right animations
            player.animations.add('left', [0, 2, 1, 2], 5, true);
            player.animations.add('right', [4, 3, 5, 3], 5, true);

            // The player always looks to the right when the game started
            player.frame = 3;

            player.action = function() {
                // Reset the player velocity (movement)
                player.body.velocity.x = 0;

                if (cursors.left.isDown)
                {
                    // Move to the left
                    player.body.velocity.x = -150;
                    player.animations.play('left');

                    // Stop the left animation while jumping
                    if ( ! player.body.touching.down) {
                        player.frame = 1;
                    }
                }
                else if (cursors.right.isDown)
                {
                    // Move to the right
                    player.body.velocity.x = 150;
                    player.animations.play('right');

                    // Stop the right animation while jumping
                    if ( ! player.body.touching.down) {
                        player.frame = 4;
                    }
                }
                else
                {
                    // Stand still
                    player.animations.stop();
                }
                
                // Allow the player to jump if they are touching the ground.
                if (cursors.up.isDown && player.body.touching.down)
                {
                    player.body.velocity.y = -350;
                }
            };
        }
    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Game = Game;

}());