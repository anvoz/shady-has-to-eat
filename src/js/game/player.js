(function() {
    'use strict';

    var Player = {
        hp: 100,
        maxHP: 100,
        spd: 150,
        isDead: false,

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

            var hp = Player.hp;
            game.playerHPText = game.add.text(10, 10, Player.getHPText(hp), {
                font: 'bold 14pt Arial'
            });

            var loop = game.time.events.loop(Phaser.Timer.SECOND, function() {
                var player = game.player,
                    hp = Player.hp;

                hp += game.config.hpPerSecond;

                if ( ! Player.inShadow(game, player)) {
                    hp += game.config.hpPerSunburn;
                }

                hp = Math.max(0, hp);
                hp = Math.min(100, hp);

                game.playerHPText.setText(Player.getHPText(hp));

                if (hp <= 0) {
                    player.isDead = true;
                    player.frame = 6;
                    player.body.velocity.x = 0;
                    player.animations.stop();

                    game.add.text(250, 150, 'Game over', {
                        font: 'bold 18pt Arial'
                    });

                    loop.timer.destroy();
                }

                Player.hp = hp;
            });

            return player;
        },
        update: function(game, player) {
            if (player.isDead) {
                return;
            }

            var cursors = game.cursors;

            // Reset player velocity (movement)
            player.body.velocity.x = 0;

            if (cursors.left.isDown)
            {
                // Move to the left
                player.body.velocity.x = -Player.spd;
                player.animations.play('left');

                // Stop the left animation while jumping
                if ( ! player.body.touching.down) {
                    player.frame = 1;
                }
            }
            else if (cursors.right.isDown)
            {
                // Move to the right
                player.body.velocity.x = Player.spd;
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
                if (player.y < 350) {
                    player.body.velocity.y = -150;
                } else {
                    player.body.velocity.y = -250;
                }
            }
        },
        inShadow: function(game, player) {
            if (player.y > 350) {
                return true;
            }
            var clouds = game.clouds.children,
                x = player.x;
            for (var i = 0; i < clouds.length; i++) {
                if (x > clouds[i].x && x < clouds[i].x + 150) {
                    return true;
                }
            }
            return false;
        },
        getHPText: function(hp) {
            return 'HP: ' + hp + ' / ' + Player.maxHP;
        }
    };

    window['shady-has-to-eat'].Game.Player = Player;

}());