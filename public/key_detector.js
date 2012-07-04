(function() {

  this.KeyDetector = (function() {

    function KeyDetector() {
      var _this = this;
      $("body").keydown(function() {
        return _this.keyDown(event);
      });
      $("body").keyup(function() {
        return _this.keyUp(event);
      });
    }

    KeyDetector.prototype.pressed = {};

    KeyDetector.prototype.keyDown = function(event) {
      return this.pressed[event.which] = true;
    };

    KeyDetector.prototype.keyUp = function(event) {
      return delete this.pressed[event.which];
    };

    return KeyDetector;

  })();

}).call(this);
