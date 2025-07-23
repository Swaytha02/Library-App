import { setupTest } from 'library-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | book', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('book', {});
    assert.ok(model, 'model exists');
  });
});
