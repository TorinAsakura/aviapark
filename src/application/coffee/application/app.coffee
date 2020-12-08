requirejs.config({
  baseUrl: './',
});

define [
  'router'
  'behaviors/behaviors'
  'helpers/mediator'
#  '../fixtures/fixtures'
], (Router, Behaviors, Mediator) ->

  SVGInjector(document.getElementById('icons-svg'));

  App = new Backbone.Marionette.Application()
  Backbone.Marionette.Behaviors.behaviorsLookup = -> Behaviors

  App.router = new Router
  Backbone.history.start({pushState: true})
  Backbone.history.length = 0

  Mediator.on 'navigate', (url) =>
    App.router.navigate(url, {trigger: true})

  $(document).scrollTop(0)

  $(document).on 'click', (e) ->
    Mediator.trigger "document:click", e

  $(document).on 'click', "a[href^='/']", (e) ->
    if (a=  $(e.currentTarget).attr('href').split('.')).length > 1
      stat = true if a[1].search('html') >= 0

    # Allow shift+click for new tabs, etc
    if !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && !stat
      e.preventDefault()

      href = $(e.currentTarget).attr('href')

      url = href.replace(/^\//,'').replace('\#\!\/','')

      # Instruct Backbone to trigger routing events
      App.router.navigate url, { trigger: true }