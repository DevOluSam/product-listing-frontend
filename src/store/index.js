import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios'


export default createStore({
  state: {
    token: localStorage.getItem('token') ||null,
    createdBy : null,
    
  },
  getters: {
    getToken: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
    getCreatedBy: (state) =>  state.createdBy,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token); // Store token in localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
      delete axios.defaults.headers.common['Authorization'];
    },
    setCreatedBy (state, createdBy ) { 
      state.createdBy  = createdBy ;
    }
  },
  actions: {
    saveToken({ commit }, token) {
      commit('setToken', token);
    },
    saveCreatedBy ({ commit }, createdBy ) { 
      commit('setCreatedBy', createdBy );
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  plugins: [createPersistedState()],
  modules: {
  }
})
