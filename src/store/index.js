import { createStore } from "vuex";
import axios, { Axios } from "axios";
export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload;
    },
    storeTodo(state, payload) {
      const index = state.todos.findIndex((todos) => todos.id === payload.id);
      if (index >= 0) {
        state.todos.splice(index, 1, payload);
      } else {
        state.todos.push(payload);
      }
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((todos) => todos.id === id);
      if (index >= 0) {
        state.todos.splice(index, 1);
      } 
    },
  },
  getters: {},
  actions: {
    getTodos({ commit }) {
      return axios.get("http://localhost:3000/todos").then((response) => {
        commit("storeTodos", response.data);
      });
    },

    addTodo({ commit }, data) {
      return axios
        .post("http://localhost:3000/todos", data)
        .then((response) => {
          commit("storeTodo", response.data);
        });
    },

    updateTodo({ commit }, { id, data }) {
      return axios
        .put(`http://localhost:3000/todos/${id}`, data)
        .then((response) => {
          commit("storeTodo", response.data);
        });
    },
    
    deleteTodo ({ commit }, id) {
      return axios
        .delete(`http://localhost:3000/todos/${id}`)
        .then(() => {
          commit("deleteTodo", id);
        });
    },
  },
  modules: {},
});
