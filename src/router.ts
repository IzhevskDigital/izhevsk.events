import Vue from 'vue';
import Router from 'vue-router';
import Events from './views/Events.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'events',
      component: Events,
    },
  ],
});
