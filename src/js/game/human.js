(function() {
    'use strict';

    var Human = {
        seconds: 0,
        create: function(game, y, count) {
            var humans;

            if ( ! game.humans) {
                // Create human group
                humans = game.humans = game.add.group();
            } else {
                humans = game.humans;
            }

            var human, x;
            for (var i = 0; i < count; i++) {
                x = Human.random(0, 625);
                human = humans.create(x, y, 'human');

                game.physics.arcade.enableBody(human);
                human.body.allowGravity = false;
            }

            game.time.events.loop(Phaser.Timer.SECOND, function() {
                Human.seconds++;
                if (Human.seconds % 5 !== 0) {
                    return;
                }

                var humans = game.humans.children;
                for (var i = 0; i < humans.length; i++) {
                    if (humans[i].x < 0) {
                        humans[i].x = Human.random(0, 625);
                        humans[i].body.velocity.x = 0;
                        humans[i].body.velocity.y = 0;
                    }
                }
            });
        },
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

    window['shady-has-to-eat'].Game.Human = Human;

}());