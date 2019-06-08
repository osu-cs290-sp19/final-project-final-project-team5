(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['photoCaption'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"entire-post\">\r\n    <div class=\"post-header\">\r\n        <div class=\"user-icon\">\r\n            <i class=\""
    + alias4(((helper = (helper = helpers.ProfileIcon || (depth0 != null ? depth0.ProfileIcon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ProfileIcon","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n        </div>\r\n        <p class=\"user-name\">\r\n            <a href=\"#\">"
    + alias4(((helper = (helper = helpers.Username || (depth0 != null ? depth0.Username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Username","hash":{},"data":data}) : helper)))
    + "</a>\r\n        </p>\r\n    </div>\r\n    <div class=\"post-content\">\r\n        <img src=\""
    + alias4(((helper = (helper = helpers.URL || (depth0 != null ? depth0.URL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"URL","hash":{},"data":data}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"post-features\">\r\n        <p class=\"description\"></p>\r\n        <div class=\"features\">\r\n            <button type=\"button\" id=\"post-like-button\"><i class=\"fa fa-heart\"></i></button>\r\n            <button type=\"button\" id=\"post-comment-button\"><i class=\"fa fa-comment\"></i></button>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();