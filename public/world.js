(function() {

  this.World = (function() {

    World.prototype.objects = [];

    World.prototype.score = {
      left: 0,
      right: 0
    };

    function World() {
      var bounds, p_height, p_speed, p_start_top;
      this.collisions = new CollisionDetector();
      bounds = new GeometricObject(0, 0, 300, 100);
      p_height = 50;
      p_start_top = 50;
      p_speed = 0.2;
      this.paddleLeft = new MoveableObject(50, p_start_top, p_height, 10, p_speed, bounds);
      bounds = new GeometricObject(500, 0, 300, 100);
      this.paddleRight = new MoveableObject(500, p_start_top, p_height, 10, p_speed, bounds);
      bounds = new GeometricObject(0, 0, 300, 600);
      this.ball = new MoveableObject(300, 150, 5, 5, .3, bounds);
      this.objects.push(this.ball);
    }

    World.prototype.initialize = function() {
      var lr;
      lr = Math.random() > 0.5 ? 0 : 180;
      this.ball.angle = (Math.floor(Math.random() * 90) - 45) + lr;
      this.ball.cleanAngle();
      return this.ball.moveToCenter();
    };

    World.prototype.move = function(delta, keys) {
      var id, obj, _ref;
      _ref = this.objects;
      for (id in _ref) {
        obj = _ref[id];
        obj.move(delta);
      }
      if (keys[87]) this.paddleLeft.moveUp(delta);
      if (keys[83]) this.paddleLeft.moveDown(delta);
      if (keys[38]) this.paddleRight.moveUp(delta);
      if (keys[0]) return this.paddleRight.moveDown(delta);
    };

    World.prototype.detectGoal = function() {
      if (this.ball.leftEdge() <= this.ball.bounds.leftEdge()) {
        this.score.right += 1;
        this.initialize();
      }
      if (this.ball.rightEdge() >= this.ball.bounds.rightEdge()) {
        this.score.left += 1;
        return this.initialize();
      }
    };

    World.prototype.handleCollisions = function() {
      if (this.collisions.detect(this.ball, this.paddleLeft)) {
        this.ball.x = this.paddleLeft.rightEdge();
        this.ball.reflect();
      }
      if (this.collisions.detect(this.ball, this.paddleRight)) {
        this.ball.x = this.paddleRight.leftEdge() - this.ball.width;
        this.ball.reflect();
      }
      if (this.collisions.boundaries(this.ball, this.ball.bounds)) {
        return this.ball.deflect();
      }
    };

    World.prototype.tick = function(delta, keys) {
      this.move(delta, keys);
      this.detectGoal();
      return this.handleCollisions();
    };

    return World;

  })();

}).call(this);
