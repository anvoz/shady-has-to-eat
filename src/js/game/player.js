(function() {
    'use strict';

    var Player = {
        create: function(game, x, y) {
            var player = game.add.sprite(x, y, 'player');

            // Player physics properties
            game.physics.arcade.enableBody(player);
            player.body.collideWorldBounds = true;

            // Walking left and right animations
            player.animations.add('left', [0, 2, 1, 2], 5, true);
            player.animations.add('right', [4, 3, 5, 3], 5, true);

            // Player always looks to the right when the game started
            player.frame = 3;

            return player;
        },
        update: function(game, player) {
            var cursors = game.cursors;

            // Reset player velocity (movement)
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
            
            // Allow player to jump if they are touching the ground.
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.body.velocity.y = -250;
            }
        }
    };

    window['shady-has-to-eat'].Game.Player = Player;

}());