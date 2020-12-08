$ ->
  routes = {
    items: ['shops', 'food', 'kids', 'service', 'entertain']
  }

  for route in routes.items
    do (route) ->
      $.mockjax(
        {
          url: "http://api.avia.kknopka.ru/items/list/#{route}"
          proxy: "/js/fixtures/items/#{route}.json"
        }
  )

  $.mockjax(
    {
      url: 'http://api.avia.kknopka.ru/*'
    }
  )