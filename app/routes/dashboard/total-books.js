import Route from '@ember/routing/route';

export default class DashboardTotalBooksRoute extends Route {
    model() {
        return JSON.parse(localStorage.getItem('books'));
    }
}
