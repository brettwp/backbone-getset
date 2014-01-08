# Backbone Get-Set

Automatically build camel case getters and setters from Backbone Model defaults.

## Dependencies

Backbone >= 1.1.0
Underscore >= 1.5.2

## Installation

1. Include Backbone and it's dependencies in your page/app.
2. Include `lib/backbone-getset.min.js`

## Usage

Be sure you are using `Backbone.extend` and `defaults` in your model definitions:

```javascript
  var MetalCube = Backbone.Model.extend({
    defaults: {
      'width': 1,
      'height': 1,
      'depth': 1,
      'density': 1.29,
      'material': 'cubane'
    }
  });
```

Now, instances of `MetalCube` will automatically have `set` and `get` functions for each of the defaults:

```javascript
  var cube = new MetalCube();
  cube.getDensity();
  // 1.29
  cube.setMaterial('carbon');
```

You can also define setters and getters in `extend` that will not be overwritten:

```javascript
  var MetalCube = Backbone.Model.extend({
    defaults: {
      'width': 1,
      'height': 1,
      'depth': 1,
      'density': 1.29,
      'material': 'cubane'
    },

    setMaterial: function(material) {
      if (material === 'cubane') {
        this.set('density', 1.29);
      } else if (material === 'carbon') {
        this.set('density', 3.515);
      }
      this.set('material', material);
      return this;
    }
  });
```

## Author

[Brett Pontarelli](http://github.com/brettwp)
