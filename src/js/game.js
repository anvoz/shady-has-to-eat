(function() {
    'use strict';

    function Game() {
        
    }

    Game.prototype = {

        preload: function() {
            var game = this;

            game.load.image('background', 'assets/background.png');
        },

        create: function () {
            var game = this;

            game.add.sprite(0, 0, 'background');
        },

        update: function () {
            
        }

    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Game = Game;

}());