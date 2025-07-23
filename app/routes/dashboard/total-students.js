import Route from '@ember/routing/route';
import { users } from '../../data/users';

export default class DashboardTotalStudentsRoute extends Route {
    model() {
        return users;
    }
}
