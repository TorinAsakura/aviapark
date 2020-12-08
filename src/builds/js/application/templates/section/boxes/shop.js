define(function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, action_types, category_link, id, logo, section, title, url) {
buf.push("<div data-tooltip=\"Удалить из избранного\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div>");
if(id == 1492){url = "/kino"}else{url = "/"+section+"/map/"+id+"-"+title}
buf.push("<a" + (jade.attr("href", "" + (url) + "", true, false)) + " class=\"stock-item__img-link\"><img data-no-retina=\"\"" + (jade.attr("data-src", "http://api.avia.kknopka.ru/" + (logo) + "", true, false)) + " alt=\"\" class=\"stock-item__img\"/><div class=\"stock-item__hidden-info\"><ul>");
if(_.indexOf(action_types, 'sale') >= 0)
{
buf.push("<li><i data-tooltip=\"Акции\" class=\"ico ico-yellow js-tooltip-top\"><svg class=\"icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i></li>");
}
if(_.indexOf(action_types, 'collection') >= 0)
{
buf.push("<li><i data-tooltip=\"Коллекции\" class=\"ico ico-aquamarine js-tooltip-top\"><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i></li>");
}
if(_.indexOf(action_types, 'event') >= 0)
{
buf.push("<li><i data-tooltip=\"События\" class=\"ico ico-purple js-tooltip-top\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i></li>");
}
if(_.indexOf(action_types, 'news') >= 0)
{
buf.push("<li><i data-tooltip=\"Новость\" class=\"ico ico-pink js-tooltip-top\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-rupor\"></use></svg></i></li>");
}
buf.push("</ul></div></a><div class=\"stock-item__info\"><div class=\"stock-item__desc\">" + (null == (jade_interp = title) ? "" : jade_interp) + "</div><div class=\"stock-item__details\">");
if(section == 'food')
{
buf.push("<i class=\"stock-item__burger-ico\"><svg class=\"ico icon icon-burger\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-burger\"></use></svg></i>");
}
else
{
buf.push("<i class=\"stock-item__shop-ico\"><svg class=\"ico icon icon-bag\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-bag\"></use></svg></i>");
}
buf.push("<a" + (jade.attr("href", "" + (url) + "", true, false)) + " class=\"stock-item__detail-text-link\">Перейти в " + (jade.escape((jade_interp = category_link) == null ? '' : jade_interp)) + "</a></div></div><div class=\"stock-item__colors stock-colors\">");
if(_.indexOf(action_types, 'sale') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__yellow\"></div>");
}
if(_.indexOf(action_types, 'collection') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__aquamarine\"></div>");
}
if(_.indexOf(action_types, 'event') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__purple\"></div>");
}
if(_.indexOf(action_types, 'news') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__pink\"></div>");
}
buf.push("</div>");}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"action_types" in locals_for_with?locals_for_with.action_types:typeof action_types!=="undefined"?action_types:undefined,"category_link" in locals_for_with?locals_for_with.category_link:typeof category_link!=="undefined"?category_link:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"logo" in locals_for_with?locals_for_with.logo:typeof logo!=="undefined"?logo:undefined,"section" in locals_for_with?locals_for_with.section:typeof section!=="undefined"?section:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"url" in locals_for_with?locals_for_with.url:typeof url!=="undefined"?url:undefined));;return buf.join("");
};

});
