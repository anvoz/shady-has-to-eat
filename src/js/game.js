(function() {
    'use strict';

    function Game() {
        var game = this;

        game.clouds = false;
        game.platforms = false;
        game.humans = false;

        game.player = false;
        game.playerHPText = false;

        game.score = 0;
        game.scoreText = false;

        game.config = {
            numOfClouds: 3,
            numOfHumans: 5,

            spdCloudPerScore: 3,

            scorePerHuman: 1,

            hpPerSecond: -1,
            hpPerSunburn: -25,
            hpPerHuman: 5
        };
    }

    Game.prototype = {

        create: function() {
            var game = this;

            game.cursors = game.input.keyboard.createCursorKeys();

            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 400;

            game.add.sprite(0, 0, 'background');

            game.createPlatforms();
            Game.Human.create(game, 330, game.config.numOfHumans);
            game.player = Game.Player.create(game, 30, 420);
            Game.Cloud.create(game, 58, game.config.numOfClouds);

            game.scoreText = game.add.text(200, 10, game.getScoreText(game.score), {
                font: 'bold 14pt Arial'
            });
        },

        update: function() {
            var game = this,
                platforms = game.platforms,
                humans = game.humans,
                player = game.player;

            game.physics.arcade.collide(player, platforms);
            game.physics.arcade.collide(player, humans, function(player, human) {
                Game.Player.hp += game.config.hpPerHuman;
                game.score += game.config.scorePerHuman;
                game.scoreText.setText(game.getScoreText(game.score));

                Game.Human.die(game, human);

                // Harder over time
                Game.Cloud.spd += game.config.spdCloudPerScore;
            });

            Game.Player.update(game, player);
        },

        createPlatforms: function() {
            var game = this,

            // The platforms group contains the ground
            // where the character can jump on
            platforms = game.platforms = game.add.group(),
            ledges = [
                [-130, 349], [110, 349], [350, 349], [590, 349],
                [50, 420], [400, 420]
            ];

            var ledge;
            for (var i = 0; i < ledges.length; i++) {
                ledge = platforms.create(ledges[i][0], ledges[i][1], 'ledge');
                game.physics.arcade.enableBody(ledge);
                ledge.body.allowGravity = false;
                ledge.body.immovable = true;
            }

            var ledge2 = platforms.create(310, 410, 'ledge2');
            game.physics.arcade.enableBody(ledge2);
            ledge2.body.allowGravity = false;
            ledge2.body.immovable = true;

            var ground = platforms.create(0, 479, 'ground');
            game.physics.arcade.enableBody(ground);
            ground.body.allowGravity = false;
            ground.body.immovable = true;
        },

        getScoreText: function(score) {
            return 'Score: ' + score;
        }
    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Game = Game;

}());