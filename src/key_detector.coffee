class @KeyDetector
  constructor: ->
    $("body").keydown(=>@keyDown(event))
    $("body").keyup(=>@keyUp(event))
  pressed: {}

  keyDown: (event) ->
    @pressed[event.which] = true

  keyUp: (event) ->
    delete @pressed[event.which]
