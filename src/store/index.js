import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins:[VuexPersistedstate()],
    state: {
        user: null
    },
    mutations: {
        LOGIN: (state, {user}) => state.user = user,
        LOGOUT: state => state.user = null
    }
});

export default store;