define [
  'templates/section/filter'
  'collections/items'
  'views/sections/dropdown'
  'views/sections/categories'
], (FilterTemplate, Items, Dropdown, CategoriesView) ->

  class FilterLayout extends Marionette.LayoutView

    @Dropdown = Dropdown

    template: => FilterTemplate(section: @options.section)

    categories: {}

    action_types:
      sale: false
      collection: false
      event: false
      news: false

    events:
      'click': 'stopPropagation'
      'focus input': 'focus'
      'input input': 'search'
      'click .js-filter__item': 'action'
      'click .filter__droplist-item': 'categoryToggle'
      'click .js-filter__cleaning': 'clearFilters'
      'click .filter__route-item': 'changeViews'

    stopPropagation: (e) ->
      e.stopPropagation()

    onRender: ->
      @dropdownView = new Dropdown
        el: @$el.find('.search-drop.js-search-drop')
        section: @options.section

      @categoriesView = new CategoriesView({
        el: @$el.find('.filter-droplist__list')
        collection: new Backbone.Collection
      })

    focus: (e) ->
      @$el.find('.js-search-drop').removeClass('is-hidden')
#      Mediator.trigger "section:input:search:focus"

    search: (e) ->
      src = $(e.currentTarget).val().trim()
      Mediator.trigger "section:filter:search", src

    action: (e) ->
      el = $(e.currentTarget)
      el.toggleClass('is-active')
      @action_types[el.data('action')] = el.hasClass('is-active')
      action_types = []
      _.each @action_types, (at, k) -> action_types.push k if at
      Mediator.trigger "section:filter:action", action_types

    clear: ->
      @$el.find('input')
        .val("")
        .trigger('input')

    onChooseItem: (m) ->
      @$el.find('input')
        .val(m.get('title'))

    categoryToggle: (e) ->
      el = $(e.currentTarget)
      el.find('.js-filter-droplist').toggleClass('is-hidden')

    clearFilters: ->
      @clear()
      Mediator.trigger "section:filter:clear"

    changeViews: ->
      Mediator.trigger "section:switch:view"