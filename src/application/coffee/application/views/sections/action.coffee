define [
  'models/item'
  'templates/section/action'
  'views/sections/item'
], (Item, ActionTemplate, ItemView) ->

  class ActionView extends ItemView

    template: ActionTemplate

    events:
      'click .js-btn-show-more-info':'showMore'
      'click .js-store__close':'closed'

    initialize: ->
      if _.isUndefined(@options.model)
        @model = new Item(id: @options.id, section: 'action')
      else
        @model = @options.model

    render: ->
      if @model.isNew()
        @model.once 'sync', => @show()
        @model.fetch()
      else
        @show()

    show: (callback = (->)) ->
      @triggerMethod('before:render', @)
      @$el.hide()
      @$el.html(@template(@model.toJSON()))

      $("#modals").ready(=>
        $("#modals").append(@$el)
        @isRendered = true
        @triggerMethod('render', @)
      )

    onOpen: -> false