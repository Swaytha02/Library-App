import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | login-page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LoginPage />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <LoginPage>
        template block text
      </LoginPage>
    `);

    assert.dom().hasText('template block text');
  });
});
