(function() {

  this.Pong = (function() {

    function Pong() {
      var bounds;
      bounds = new GeometricObject(0, 0, 300, 100);
      this.paddleLeft = new MoveableObject(50, 120, 30, 10, 1, bounds);
    }

    Pong.prototype.detectPaddleCollision = function(obj1, obj2) {
      if (this.ball.x <= this.paddleLeft.rightEdge() && this.ball.x >= this.paddleLeft.leftEdge() && this.ball.bottomEdge() >= this.paddleLeft.topEdge() && this.ball.topEdge() <= this.paddleLeft.bottomEdge()) {
        this.ball.x = this.paddleLeft.rightEdge();
        this.ball.reflect();
      }
      if (this.ball.x >= this.paddleRight.leftEdge() && this.ball.x <= this.paddleRight.rightEdge() && this.ball.bottomEdge() >= this.paddleRight.topEdge() && this.ball.topEdge() <= this.paddleRight.bottomEdge()) {
        this.ball.x = this.paddleRight.leftEdge() - this.ball.width;
        return this.ball.reflect();
      }
    };

    Pong.prototype.setGame = function() {
      this.ball.angle = 1;
      this.ball.cleanAngle();
      return this.ball.moveToCenter();
    };

    Pong.prototype.detectBoundaryCollission = function(obj) {
      if (obj.topEdge() <= obj.bounds.topEdge()) {
        obj.y = obj.bounds.topEdge();
        obj.deflect();
      }
      if (obj.bottomEdge() >= obj.bounds.bottomEdge()) {
        obj.y = obj.bounds.bottomEdge() - obj.height;
        return obj.deflect();
      }
    };

    Pong.prototype.moveBall = function(delta) {
      return this.obj.move(delta);
    };

    Pong.prototype.tick = function(delta) {
      this.moveBall(delta);
      this.detectPaddleCollision();
      return this.detectiBoundaryCollission(this.ball);
    };

    return Pong;

  })();

}).call(this);
