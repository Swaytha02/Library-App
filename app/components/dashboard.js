import Component from '@glimmer/component';
import { books } from '../data/books';
import { inject as service } from '@ember/service';

export default class Dashboard extends Component {
    @service('router') router;

    get overDueBooks() {
        return books;
    }
}
