import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login';
import Lobby from '../components/Lobby';
import Trade from '../components/Trade';
import Leaderboard from '../components/Leaderboard';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/trade',
        component: Lobby,
        children: [
            {
                path: '',
                component: Trade
            },
            {
                path: '/leaderboard',
                name: 'leaderboard',
                component: Leaderboard
            }
        ],
        beforeEnter: (to, from, next) => {
            if (!store.state.user) return next('/');
            next();
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router