class @World
  objects: []
  score: {left: 0, right: 0}
  constructor: ->
    @collisions = new CollisionDetector()
    bounds = new GeometricObject(0,0,300,100)
    p_height = 50
    p_start_top = 50
    p_speed = 0.2
    @paddleLeft = new MoveableObject(50,p_start_top,p_height,10,p_speed,bounds)
    bounds = new GeometricObject(500,0,300,100)
    @paddleRight = new MoveableObject(500,p_start_top,p_height,10,p_speed,bounds)
    bounds = new GeometricObject(0,0,300,600)
    @ball = new MoveableObject(300,150,5,5,.3,bounds)
    @objects.push @ball

  initialize: ->
    lr = if(Math.random() > 0.5) then 0 else 180
    @ball.angle = (Math.floor(Math.random() * 90) - 45) + lr
    #@ball.angle = 160
    @ball.cleanAngle()
    @ball.moveToCenter()

  move: (delta, keys) ->
    for id, obj of @objects
      obj.move(delta)
    @paddleLeft.moveUp(delta) if keys[87]
    @paddleLeft.moveDown(delta) if keys[83]
    @paddleRight.moveUp(delta) if keys[38]
    @paddleRight.moveDown(delta) if keys[0]

  detectGoal: ->
    if @ball.leftEdge() <= @ball.bounds.leftEdge()
      @score.right += 1
      @initialize()
    if @ball.rightEdge() >= @ball.bounds.rightEdge()
      @score.left += 1
      @initialize()

  handleCollisions: ->
    if @collisions.detect(@ball, @paddleLeft)
      @ball.x = @paddleLeft.rightEdge()
      @ball.reflect()
    if @collisions.detect(@ball, @paddleRight)
      @ball.x = @paddleRight.leftEdge() - @ball.width
      @ball.reflect()
    @ball.deflect() if @collisions.boundaries(@ball, @ball.bounds)

  tick: (delta, keys) ->
    @move(delta, keys)
    @detectGoal()
    @handleCollisions()
