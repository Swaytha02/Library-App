import Route from '@ember/routing/route';
import { books } from '../data/books';

export default class DashboardRoute extends Route {
    beforeModel() {
        const storedBooks = localStorage.getItem('books');
        if(!storedBooks){
            localStorage.setItem('books', JSON.stringify(books)); 
        }
        
    }
}
