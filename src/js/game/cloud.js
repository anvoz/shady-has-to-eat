(function() {
    'use strict';

    var Cloud = {
        spd: 100,
        create: function(game, y, count) {
            var clouds;

            if ( ! game.clouds) {
                // Create cloud group
                clouds = game.clouds = game.add.group();
            } else {
                clouds = game.clouds;
            }

            var cloud, x;
            for (var i = 0; i < count; i++) {
                x = Cloud.random(0, 200) + (i * 200) - 100;
                cloud = clouds.create(x, y, 'cloud');

                game.physics.arcade.enableBody(cloud);
                cloud.body.velocity.x = Cloud.spd;
                cloud.body.allowGravity = false;
                cloud.checkWorldBounds = true;

                cloud.events.onOutOfBounds.add(Cloud.reset, cloud);
            }
        },
        reset: function() {
            var cloud = this;

            cloud.x = Cloud.random(0, 200) - 400;
        },
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

    window['shady-has-to-eat'].Game.Cloud = Cloud;

}());