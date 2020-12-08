$(function() {
  var fn, i, len, ref, route, routes;
  routes = {
    items: ['shops', 'food', 'kids', 'service', 'entertain']
  };
  ref = routes.items;
  fn = function(route) {
    return $.mockjax({
      url: "http://api.avia.kknopka.ru/items/list/" + route,
      proxy: "/js/fixtures/items/" + route + ".json"
    });
  };
  for (i = 0, len = ref.length; i < len; i++) {
    route = ref[i];
    fn(route);
  }
  return $.mockjax({
    url: 'http://api.avia.kknopka.ru/*'
  });
});
