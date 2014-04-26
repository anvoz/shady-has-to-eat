(function() {
    'use strict';

    function Game() {
        
    }

    Game.prototype = {

        preload: function() {
            var game = this;

            game.load.image('background', 'assets/background.png');

            game.load.image('ledge', 'assets/ledge.png');
        },

        create: function() {
            var game = this;

            game.add.sprite(0, 0, 'background');

            game.createPlatforms();
        },

        update: function() {
            
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

            for (var i = 0; i < ledges.length; i++) {
                platforms.create(ledges[i][0], ledges[i][1], 'ledge');
            }
        }
    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Game = Game;

}());