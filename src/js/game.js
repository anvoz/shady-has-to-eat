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

            scorePerHuman: 10,

            hpPerSecond: -1,
            hpPerSunburn: -20,
            hpPerHuman: 10
        };
    }

    Game.prototype = {

        preload: function() {
            var game = this;

            game.load.image('background', 'assets/background.png');
            game.load.image('cloud', 'assets/cloudws.png');

            game.load.image('ground', 'assets/ground.png');
            game.load.image('ledge', 'assets/ledge.png');

            game.load.spritesheet('player', 'assets/player.png', 30, 30);
            game.load.image('human', 'assets/human.png');
        },

        create: function() {
            var game = this;

            game.cursors = game.input.keyboard.createCursorKeys();

            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 400;

            game.add.sprite(0, 0, 'background');

            game.createPlatforms();
            Game.Cloud.create(game, 60, game.config.numOfClouds);
            Game.Human.create(game, 330, game.config.numOfHumans);
            game.player = Game.Player.create(game, 30, 400);

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
                human.x = -1000;
                human.y = 330;
                human.body.velocity.x = 0;
                human.body.velocity.y = 0;

                game.score += game.config.scorePerHuman;
                game.scoreText.setText(game.getScoreText(game.score));
            });

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
        },

        getScoreText: function(score) {
            return 'Score: ' + score;
        }
    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Game = Game;

}());