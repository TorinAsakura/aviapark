define [
  'templates/section/filter/category'
], (CategoryTemplate) ->

  class CategoryView extends Marionette.ItemView

    template: CategoryTemplate

    events:
      'click a': 'chooseCategory'

    chooseCategory: (e) ->
      e.stopPropagation()
      e.preventDefault()

      li = $(e.currentTarget).parent('li')
      li.toggleClass('active')

      category = {
        title: li.data('category')
        active: li.hasClass('active')
      }

      Mediator.trigger "section:filter:category", category


  class CategoriesView extends Marionette.CollectionView

    childView: CategoryView

    hide: ->
      @$el.parent().addClass 'is-hidden'