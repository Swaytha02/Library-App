import Route from '@ember/routing/route';

export default class DashboardBookIssuedRoute extends Route {
    model() {
        return JSON.parse(localStorage.getItem('books'));
    }
}
