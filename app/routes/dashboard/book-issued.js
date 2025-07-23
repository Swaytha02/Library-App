import Route from '@ember/routing/route';
import { books } from '../../data/books';

export default class DashboardBookIssuedRoute extends Route {
    model() {
        return books;
    }
}
