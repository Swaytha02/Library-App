import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { users } from '../data/users';
import { books } from '../data/books';

export default class LoginPage extends Component {
    @service('store') store;
    @service('router') router;
    @service session;

    @tracked username = '';
    @tracked password = '';
    @tracked errorMessage = '';

    @action
    updateUsername(event) {
        this.username = event.target.value;
    }

    @action
    updatePassword(event) {
        this.password = event.target.value;
    }

    @action
    async handleLogin(event) {
        event.preventDefault();
        
        // const users = this.store.peekAll('user');

        const user = users.find(
            (u) => u.username === this.username && u.password === this.password
        );

        if(user) {
            this.session.login(user);

            this.username = '';
            this.password = '';

            if(user.role === 'admin'){
                this.router.transitionTo('dashboard');
            } else if(user.role === 'student') {
                this.router.transitionTo('student-dashboard');
            } else {
                this.errorMessage = 'Unknown role';
            }
        } else {
            this.errorMessage = 'Invalid credentials';
        }
    }
}
