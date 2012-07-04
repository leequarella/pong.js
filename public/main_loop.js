(function() {

  this.MainLoop = (function() {

    function MainLoop() {
      this.ui = new GameUi();
      this.world = new World();
      this.keyDetector = new KeyDetector();
      this.lastExecuted = new Date();
      this.world.initialize();
      setInterval("game.loop()", 1);
    }

    MainLoop.prototype.loop = function() {
      var delta, now;
      now = new Date();
      delta = this.lastExecuted - now;
      this.world.tick(delta, this.keyDetector.pressed);
      this.ui.render(this.world);
      return this.lastExecuted = now;
    };

    return MainLoop;

  })();

}).call(this);
