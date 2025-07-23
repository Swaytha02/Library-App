import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | book-issued', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<BookIssued />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <BookIssued>
        template block text
      </BookIssued>
    `);

    assert.dom().hasText('template block text');
  });
});
