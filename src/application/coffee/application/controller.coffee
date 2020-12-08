define [
  'controllers/sections'
  'controllers/home'

], (SectionsController, HomeController) ->

  class Controller extends Marionette.Controller

    @$el = $('#content')

    @sectionsController: new SectionsController($el:@$el)
    @homeController: new HomeController($el:@$el)

    @baseAction: (action, layout) ->
      Backbone.history.length += 1
      action()
      if @$el.find(layout.$el).length == 0
        @$el.append(layout.el)
        layout.onShow()
      @update(layout)

    @home: ->
      @baseAction ( =>
        $('a.nav__link.active').removeClass('active')
        ), @homeController.go()

    @section: (section, view = '') ->
      @baseAction ( =>
          $('a.nav__link.active').removeClass('active')
          $("a.nav__link[href='/#{section}']").addClass('active')
        ), @sectionsController.go(section, null, view)

    @sectionItem: (section, uid) ->
      @baseAction ( =>
        $('a.nav__link.active').removeClass('active')
        $("a.nav__link[href='/#{section}']").addClass('active')
      ), @sectionsController.go(section, uid, 'map')

    @update: (layout) ->
      @$el.children('section[class^="layout__"],section[class*="layout__"]').hide()
      layout.$el.show()
