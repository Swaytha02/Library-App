import { module, test } from 'qunit';
import { setupTest } from 'library-app/tests/helpers';

module('Unit | Route | dashboard/Book-Issued', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dashboard/book-issued');
    assert.ok(route);
  });
});
