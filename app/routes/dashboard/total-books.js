import Route from '@ember/routing/route';
import { books } from '../../data/books';

export default class DashboardTotalBooksRoute extends Route {
    model() {
        return books;
    }
}
