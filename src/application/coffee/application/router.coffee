define ['controller'], (Controller) ->

  class Router extends Backbone.Marionette.AppRouter

    controller: Controller

    appRoutes:
      ":section": "section"
      ":section/:view": "section"
      ":section/map/:uid": "sectionItem"
      "": "home"