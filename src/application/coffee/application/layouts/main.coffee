define ['templates/index', 'snap-main-animations', 'main'], (IndexTemplate, animations, main, gm) ->

  class MainLayout extends Backbone.Marionette.LayoutView

    el: $('<section class="section-main layout__home" id="main">')
    template: IndexTemplate

    onShow: ->
      animations()
      main()