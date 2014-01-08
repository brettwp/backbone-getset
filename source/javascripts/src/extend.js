(function(){
  var extend = Backbone.Model.extend;
  Backbone.Model.extend = function(properties, classProperties) {
    var child = extend.apply(this, arguments);
    var proto = child.prototype;
    var defaults = _.result(proto, 'defaults');
    if (defaults) {
      for (var property in defaults) {
        createMethod(proto, property, 'set');
        createMethod(proto, property, 'get');
      }
    }
    return child;
  };

  function createMethod(proto, property, prefix) {
    var method = [prefix, property].
          join('_').
          replace(/(\_[a-z])/g, function($1){return $1[1].toUpperCase()});
    if (!proto[method]) {
      proto[method] = function(value) {
        Array.prototype.unshift.call(arguments, property);
        return this[prefix].apply(this, arguments);
      }
    }
  }
})();
