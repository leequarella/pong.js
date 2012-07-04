class @MainLoop
  constructor: ->
    @ui = new GameUi()
    @world = new World()
    @keyDetector = new KeyDetector()
    @lastExecuted = new Date()
    @world.initialize()
    setInterval("game.loop()", 1)

  loop: ->
    now = new Date()
    delta = @lastExecuted - now
    @world.tick(delta, @keyDetector.pressed)
    @ui.render(@world)
    @lastExecuted = now
