import { module, test } from 'qunit';
import { setupTest } from 'library-app/tests/helpers';

module('Unit | Route | student-dashboard', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:student-dashboard');
    assert.ok(route);
  });
});
