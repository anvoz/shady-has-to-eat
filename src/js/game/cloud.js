(function() {
    'use strict';

    var Cloud = {
        spd: 100,
        lastRndX: 0,
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
            var cloud = this,
                lastRndX = Cloud.lastRndX,
                x = Cloud.random(0, 200) - 400;

            // Not create clouds that are too close to each others
            if (x >= lastRndX - 30 && x <= lastRndX + 30) {
            console.log(x, lastRndX);
                x += (x > lastRndX) ? 30 : -30;
            }
            Cloud.lastRndX = x;

            cloud.x = x;
            cloud.body.velocity.x = Cloud.spd;
        },
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

    window['shady-has-to-eat'].Game.Cloud = Cloud;

}());