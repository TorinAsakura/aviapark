define ['models/item'], (Item) ->

  class Items extends Backbone.Collection

    model: Item
    type: 'shops'

    url: ->
      if _.isUndefined(@type)
        return "http://api.ru/items/list"
      else if @type == 'actions'
        return "http://api.ru/actions/list"
      else
        return "http://api.ru/items/list/#{@type}"

    parse: (model) ->
      data = []
      for model in _.values(model)
        do (model) =>
          data.push Item.prototype.parse(model)
      data

    reset: (models, options) ->
      if(options && options.parse)
        delete options.parse
        models = @parse(models)
      return Backbone.Collection.prototype.reset.call(@, models, options)