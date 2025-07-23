import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SessionService extends Service {
    @tracked currentUser = null;

    constructor() {
        super(...arguments);

        const cookieUser = this.#getCookie('user');
        if(cookieUser) {
            try{
                this.currentUser = JSON.parse(decodeURIComponent(cookieUser));
            }
            catch(e) {
                console.error('Failed to parse cookie:', e);
            }
        }
    }

    @action
    login(user) {
        this.currentUser = user;
        const userString = encodeURIComponent(JSON.stringify({
            id: user.id,
            name: user.name,
            role: user.role,
            username: user.username
        }));

        document.cookie = `user=${userString};path=/;max-age=86400`;
    }

    @action
    logOut() {
        this.currentUser = null;
        document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }

    #getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if(parts.length === 2) return parts.pop().split(';').shift();
    }
}
