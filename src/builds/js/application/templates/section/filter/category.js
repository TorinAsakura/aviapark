define(function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (category, category_title) {
buf.push("<li" + (jade.attr("data-category", '' + (category) + '', true, false)) + " class=\"filter-droplist__item\"><a href=\"#\" class=\"filter-droplist__link\"><i></i>" + (jade.escape((jade_interp = category_title) == null ? '' : jade_interp)) + "</a></li>");}.call(this,"category" in locals_for_with?locals_for_with.category:typeof category!=="undefined"?category:undefined,"category_title" in locals_for_with?locals_for_with.category_title:typeof category_title!=="undefined"?category_title:undefined));;return buf.join("");
};

});
