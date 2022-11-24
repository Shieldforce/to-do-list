import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id : 1,
        title: 'Ir ao mercado com Nane',
        description: 'Descrição de tarefa',
        completed: false,
      },
      {
        id : 2,
        title: 'Ir ao cinema com Nane',
        description: 'Descrição de tarefa',
        completed: false,
      },
      {
        id : 3,
        title: 'Ir ao salão com Nane',
        description: 'Descrição de tarefa',
        completed: false,
      },
    ]
  },
  getters: {
  },
  mutations: {
    addTask(state, task) {
     if(task.title && task.description) {
        state.tasks.push({
          id: new Date().getTime(),
          order: 0,
          title: task.title,
          description: task.description,
          completed: false
        });
      }
    },
    removeTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    }
  },
  actions: {
  },
  modules: {
  }
})
