describe('Backbone.Model.extend', function() {
  var TestModel, model, getSpy, setSpy;

  beforeEach(function(){
    getSpy = jasmine.createSpy();
    setSpy = jasmine.createSpy();
    TestModel = Backbone.Model.extend({
      defaults: {
        valueOne: null,
        value_two: null,
        value_methodTest: null
      },

      getValueMethodTest: getSpy,

      setValueMethodTest: setSpy
    });
    model = new TestModel();
  });

  it('should create new models', function() {
    var TestModel = Backbone.Model.extend(),
        model = new TestModel();
    expect(_.isFunction(TestModel)).toBe(true);
    expect(model instanceof Backbone.Model).toBe(true);
  });

  it('should add getters from defaults', function() {
    expect(_.isFunction(TestModel.prototype.getValueOne)).toBe(true);
    expect(_.isFunction(TestModel.prototype.getValueTwo)).toBe(true);
    expect(_.isFunction(model.getValueOne)).toBe(true);
    expect(_.isFunction(model.getValueTwo)).toBe(true);
  });

  it('should add setters from defaults', function() {
    expect(_.isFunction(TestModel.prototype.setValueOne)).toBe(true);
    expect(_.isFunction(TestModel.prototype.setValueTwo)).toBe(true);
    expect(_.isFunction(model.setValueOne)).toBe(true);
    expect(_.isFunction(model.setValueTwo)).toBe(true);
  });

  it('should not add if get/set is already defined', function() {
    expect(_.isFunction(TestModel.prototype.getValueMethodTest)).toBe(true);
    expect(_.isFunction(TestModel.prototype.setValueMethodTest)).toBe(true);
    model.getValueMethodTest();
    expect(getSpy).toHaveBeenCalled();
    model.setValueMethodTest();
    expect(setSpy).toHaveBeenCalled();
  });

  it('should get values on model', function() {
    expect(model.getValueOne()).not.toEqual('TEST1');
    model.set('valueOne', 'TEST1');
    expect(model.getValueOne()).toEqual('TEST1');
  });

  it('should set values on model', function() {
    expect(model.get('value_two')).not.toEqual('TEST2');
    model.setValueTwo('TEST2');
    expect(model.get('value_two')).toEqual('TEST2');
  });

  it('should pass through other arguments (get)', function(){
    var spy = spyOn(model, 'get');
    model.getValueOne('1', 2, {three: true});
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('valueOne', '1', 2, {three: true});
  });

  it('should pass through other arguments (set)', function(){
    var spy = spyOn(model, 'set');
    model.setValueTwo({silent: true});
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('value_two', {silent: true});
  });
});
