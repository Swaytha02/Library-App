import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dashboard/book-title', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Dashboard::BookTitle />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Dashboard::BookTitle>
        template block text
      </Dashboard::BookTitle>
    `);

    assert.dom().hasText('template block text');
  });
});
