define ->

  class OpenItemView extends Marionette.Behavior

    onRender: ->
      @view.$el.on 'click', @options.selector, (e) =>
        e.preventDefault()
        el = $(e.currentTarget).find('.modal-link')

        id = if _.isUndefined(@view.model) then el.data('itemid') else @view.model.get('id')

        ##
        #
        # Monkey path 1492
        #
        ##

        if el.data('target') == '#link-modal-cinema' or id == 1492
          Mediator.trigger 'cinema:choose'
        else
          Mediator.trigger 'item:choose', id