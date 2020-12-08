define(function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, date_end, date_start, discount, id, image_promo, longtitle, name, parent_title, price, title, type, type_rr) {
buf.push("<div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></div><a" + (jade.attr("href", "/actions/map/" + (id) + "-" + (name) + "", true, false)) + " class=\"stock-item__img-link\"><img data-no-retina=\"\"" + (jade.attr("data-src", "http://api.avia.kknopka.ru/" + (image_promo) + "", true, false)) + " alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">" + (jade.escape(null == (jade_interp = parent_title) ? "" : jade_interp)) + "</div>");
if(_.isEmpty(longtitle))
{
buf.push("<div class=\"stock-item__desc\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"stock-item__desc\">" + (jade.escape(null == (jade_interp = longtitle) ? "" : jade_interp)) + "</div>");
}
buf.push("<div class=\"stock-item__details\">");
if(!_.isEmpty(date_start))
{
buf.push("<i class=\"stock-item__calendar-ico\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i><span class=\"stock-item__detail-text\">С " + (jade.escape((jade_interp = date_start) == null ? '' : jade_interp)) + "</span>");
if(!_.isEmpty(date_end))
{
buf.push(" по " + (jade.escape((jade_interp = date_end) == null ? '' : jade_interp)) + "");
}
}
else
{
if(type == 'sale')
{
buf.push("<i class=\"stock-item__discount-ico\"><svg class=\"ico icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i>");
}
else if(type == 'collection')
{
buf.push("<i class=\"stock-item__collection-ico\"><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i>");
}
else if(type == 'news')
{
buf.push("<i class=\"stock-item__rupor-ico\"><svg class=\"icon icon-rupor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-rupor\"></use></svg></i>");
}
else if(type == 'event')
{
buf.push("<i class=\"stock-item__calendar-ico\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i>");
}
buf.push("<a" + (jade.attr("href", "/actions/map/" + (id) + "-" + (name) + "", true, false)) + " class=\"stock-item__detail-text-link\">Показать " + (jade.escape((jade_interp = type_rr) == null ? '' : jade_interp)) + "</a>");
}
buf.push("</div></div>");
if(!_.isEmpty(discount) && !_.isEmpty(price))
{
buf.push("<div class=\"stock-item__footer\">");
if(!_.isEmpty(discount))
{
buf.push("<div class=\"stock-item__discount\"><i class=\"stock-item__discount-ico stock-item__discount-ico--perc\"><svg class=\"ico icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i>" + (jade.escape(null == (jade_interp = discount) ? "" : jade_interp)) + "</div>");
}
if(!_.isEmpty(price))
{
buf.push("<div class=\"stock-item__price\"><span class=\"stock-item__price-val\">" + (jade.escape(null == (jade_interp = price) ? "" : jade_interp)) + "</span><span class=\"stock-item__currency\">руб</span></div>");
}
buf.push("</div>");
}}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"date_end" in locals_for_with?locals_for_with.date_end:typeof date_end!=="undefined"?date_end:undefined,"date_start" in locals_for_with?locals_for_with.date_start:typeof date_start!=="undefined"?date_start:undefined,"discount" in locals_for_with?locals_for_with.discount:typeof discount!=="undefined"?discount:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"image_promo" in locals_for_with?locals_for_with.image_promo:typeof image_promo!=="undefined"?image_promo:undefined,"longtitle" in locals_for_with?locals_for_with.longtitle:typeof longtitle!=="undefined"?longtitle:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"parent_title" in locals_for_with?locals_for_with.parent_title:typeof parent_title!=="undefined"?parent_title:undefined,"price" in locals_for_with?locals_for_with.price:typeof price!=="undefined"?price:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"type" in locals_for_with?locals_for_with.type:typeof type!=="undefined"?type:undefined,"type_rr" in locals_for_with?locals_for_with.type_rr:typeof type_rr!=="undefined"?type_rr:undefined));;return buf.join("");
};

});
