(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {

        preload: function() {
            this.asset = this.add.sprite(320, 240, 'preloader');
            this.asset.anchor.setTo(0.5, 0.5);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);

            this.load.image('menu', 'assets/menu.png');

            this.load.image('player', 'assets/player.png');
            this.load.image('background', 'assets/background.png');
            this.load.image('cloud', 'assets/cloudws.png');

            this.load.image('ground', 'assets/ground.png');
            this.load.image('ledge', 'assets/ledge.png');
            this.load.image('ledge2', 'assets/ledge2.png');

            this.load.spritesheet('player', 'assets/player.png', 30, 30);
            this.load.image('human', 'assets/human.png');
        },

        create: function() {
            this.asset.cropEnabled = false;
        },

        update: function() {
            if (!!this.ready) {
                this.game.state.start('menu');
            }
        },

        onLoadComplete: function() {
            this.ready = true;
        }
    };

    window['shady-has-to-eat'] = window['shady-has-to-eat'] || {};
    window['shady-has-to-eat'].Preloader = Preloader;

}());