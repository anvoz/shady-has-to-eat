(function() {
    'use strict';

    function Menu() {
        this.titleTxt = null;
        this.startTxt = null;
    }

    Menu.prototype = {

        create: function() {
            this.add.sprite(0, 0, 'menu');

            this.input.onDown.add(this.onDown, this);
        },

        update: function() {

        },

        onDown: function() {
            this.game.state.start('game');
        }
    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Menu = Menu;

}());
