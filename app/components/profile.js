import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Profile extends Component {
    @service session;
    @service router;
    @tracked showProfileMenu = false;

    @action
    toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
    }

    @action
    closeMenu() {
        this.showProfileMenu = false;
    }

    @action
    logOut() {
        this.session.logOut();
        this.router.transitionTo('login-page');
    }
}
