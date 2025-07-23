import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileSetting extends Component {
    @service session;

    @tracked name = this.session.currentUser?.name;
    @tracked email = this.session.currentUser?.role === 'student' ? 'student@example.com' : 'admin@example.com';

    @action
    updateName(event) {
        this.name = event.target.value;
    }

    @action
    updateEmail(event) {
        this.email = event.target.value;
    }

    @action
    saveProfile(event) {
        event.preventDefault();

        console.log('Saving profile...', {
            name: this.name,
            email: this.email
        });

        alert('Profile saved successfully!');
    }
}
