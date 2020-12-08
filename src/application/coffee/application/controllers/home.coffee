define [
  'layouts/main'
], (MainLayout) ->

  class HomeController extends Marionette.Controller

    initialize: (options) ->
      @$el = options.$el

    go: ->
      @mainLayout ||= new MainLayout().render()