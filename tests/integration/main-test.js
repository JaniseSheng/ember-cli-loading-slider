import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from '../../tests/helpers/start-app';

let application;

moduleForAcceptance('Acceptance | Main', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /75', function(assert) {
  visit('/75');

  andThen(() => {
    assert.equal(find('.loading-slider').length, 1, "The component's element exists");
    assert.equal(find('.loading-slider span').length, 1, 'The component has inserted one span');
    assert.equal(find('.loading-slider span').width(), 0, 'The stripe has finished animating and is width 0');
  });
});

test('testing animation', function(assert) {
  assert.expect(2);

  visit('/');

  andThen(() => {
    // use the jQuery click rather than the promise observing click
    find('button:first').click();

    Ember.run.later(() => {
      assert.equal($('.loading-slider span:last').width() > 0, true, 'The slider has animated');
    }, 500);

    Ember.run.later(() => {
      assert.equal($('.loading-slider span').length === 0, true, 'The slider has reset');
    }, 1500);
  });

});

test('testing multi-color centered animation', function(assert) {
  visit('/');

  andThen(() => {

    // use the jQuery click rather than the promise observing click
    find('button:nth-of-type(3)').click();

    Ember.run.later(() => {
      assert.equal(find('.loading-slider span:last').width() > 0, true, 'The slider has animated');
    }, 1000);

    Ember.run.later(() => {
      assert.equal(find('.loading-slider span').length > 2, true, 'There are multiple sliders');
    }, 1500);

    Ember.run.later(() => {
      assert.equal(find('.loading-slider span').length === 0, true, 'The slider has reset');
    }, 5500);
  });

});

