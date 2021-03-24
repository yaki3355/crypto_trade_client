import store from '../store';
import router from '../router';

function getToken() {
    return {headers: {Authorization: `Bearer: ${store.state.user.token}`}};
}

function auth(response) {
    if (response.status !== 401) return;

    store.commit('LOGOUT');
    router.push('/');
}

export {
    getToken,
    auth
}