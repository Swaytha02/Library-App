import EmberRouter from '@ember/routing/router';
import config from 'library-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dashboard', function () {
    this.route('total-books');
    this.route('book-issued');
    this.route('total-students');
  });
  this.route('login-page');
  this.route('student-dashboard');
});

