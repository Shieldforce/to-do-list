<template>
  <div>
    <v-container>
      <div>
        <v-form
            ref="formAddTaskvalid"
            v-model="formAddTaskvalid"
            @submit.prevent="handleSaveTask"
            lazy-validation
        >
          <v-row>
            <v-col
                cols="12"
                sm="5"
            >
              <v-text-field
                  v-model="title"
                  label="Tarefa"
                  outlined
                  clearable
                  :rules="titleRules"
                  :counter="30"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="5"
            >
              <v-text-field
                  v-model="description"
                  label="Descrição"
                  outlined
                  clearable
                  :rules="descriptionRules"
                  :counter="191"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="2"
            >
              <v-btn
                  type="submit"
                  x-large
                  style="width: 100%"
                  :loading="loading"
                  :disabled="loading"
                  color="secondary"
              >
                Salvar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-list
            flat
            subheader
            three-line
        >
          <v-list-item-group
              multiple
              active-class=""
          >
            <div
                v-for="(task) in this.$store.state.tasks"
                :key="task.id"
            >
              <TaskComponent
                  :task="task"
                  cardColorCompleted="green"
                  colorDefault="green"
              />
            </div>
          </v-list-item-group>
        </v-list>
      </div>
    </v-container>
  </div>
</template>

<script>
import TaskComponent from "@/components/Tasks/TaskComponent";
import httpAxiosApiTags from "@/plugins/axiosApiTags";

export default {
  name: 'TasksView',

  components: {
    TaskComponent
  },
  mounted() {
    this.requiredToken();
    this.getListTaks();
  },
  data() {
    return {
      tasks: [],
      formAddTaskvalid: false,
      titleRules: [
        v => !!v || 'Título é obrigatório!',
        v => (v && v.length <= 30) || 'Título deve ser menor ou igual a 30!',
      ],
      descriptionRules: [
        v => !!v || 'Descrição é obrigatório!',
        v => (v && v.length <= 191) || 'Título deve ser menor ou igual a 191!',
      ],
      title: null,
      description: null,
      loading: false,
      completed: false,
    }
  },
  methods: {
    handleSaveTask() {
      this.loading = true;
      if (!this.$refs.formAddTaskvalid.validate()) {
        this.loading = false;
        return;
      }
      this.$store.commit(
          'addTask',
          {
            title: this.title,
            description: this.description
          }
      );
      this.$refs.formAddTaskvalid.reset();
      this.loading = false;
    },
    loginApiTags() {
      httpAxiosApiTags.post(`/access/login`, {
        email: process.env.VUE_APP_USER_API_TAGS,
        password: process.env.VUE_APP_PASS_API_TAGS,
      }).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token);
      });
    },
    requiredToken() {
      var getToken = localStorage.getItem('access_token');
      if (getToken) {
        httpAxiosApiTags.get(`/access/me`, {
          headers: {
            'Authorization': `Bearer ${getToken}`
          }
        }).then(response => {
          localStorage.setItem('access_token', response.data.data.access_token);
          localStorage.setItem('expired', response.data.data.microtime);
        }).catch(response => {
          if (response.response.data.message === "Token expirado!") {
            this.loginApiTags();
          }
        });
      } else {
        this.loginApiTags();
      }
    },
    getListTaks() {
      this.$store.commit('listTasks', {}, {});
    }
  },
}
</script>
