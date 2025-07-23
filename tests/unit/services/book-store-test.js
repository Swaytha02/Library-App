import { module, test } from 'qunit';
import { setupTest } from 'library-app/tests/helpers';

module('Unit | Service | book-store', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:book-store');
    assert.ok(service);
  });
});
