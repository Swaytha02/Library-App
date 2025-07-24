import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  @service('router') router;
  @service session;

  beforeModel() {
    const user = this.session.currentUser;

    if (user) {
      if (user.role === 'admin') {
        this.router.replaceWith('dashboard'); 
      } else if (user.role === 'student') {
        this.router.replaceWith('student-dashboard'); 
      } else {
        this.router.replaceWith('login-page');
      }
    } else {
      this.router.replaceWith('login-page');
    }
  }
}

