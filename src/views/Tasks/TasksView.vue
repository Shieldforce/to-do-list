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
                v-for="(task) in tasks"
                :key="task.id"
            >
              <TaskComponent
                  :task="task"
                  cardColorCompleted="green"
                  colorDefault="green"
                  :tasks="tasks"
                  :removeTask="handleRemoveTask"
                  :completedTask="handleCompletedTask"
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
    this.handleRequiredToken();
    this.handleGetListTaks();
  },
  data() {
    return {
      tasks: [],
      tagsTasksId: null,
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
      this.handleAddTaks();
      this.$refs.formAddTaskvalid.reset();
      this.loading = false;
    },
    handleLoginApiTags() {
      httpAxiosApiTags.post(`/access/login`, {
        email: process.env.VUE_APP_USER_API_TAGS,
        password: process.env.VUE_APP_PASS_API_TAGS,
      }).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token);
      });
    },
    handleRequiredToken() {
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
            this.handleLoginApiTags();
          }
        });
      } else {
        this.handleLoginApiTags();
      }
    },
    handleGetListTaks() {
      setTimeout(() => {
        httpAxiosApiTags.get(`/tag/my-tags`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }).then(response => {
          var list = response.data.data.data;
          var tagsTasks = list.filter(tag => tag.title === 'Tags Shieldforce Tags');
          this.tagsTasksId = tagsTasks[0].id;
          this.tasks = JSON.parse(tagsTasks[0].description);
        });
      }, 500)
    },
    handleAddTaks() {
      if (this.title && this.description) {
        var id = new Date().getTime();
        var objTask = {
          id: id,
          order: 0,
          title: this.title,
          description: this.description,
          completed: false
        };
        this.tasks.push(objTask);
        var data = this.tasks;
        httpAxiosApiTags.post(`/tag/edit-my-tags/${this.tagsTasksId}`, {description: data}, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              },
            }
        ).catch(response => {
          this.tasks.splice(objTask, 1);
          return response;
        });
      }
    },
    handleRemoveTask(task) {
      httpAxiosApiTags.post(`/tag/edit-my-tags/${this.tagsTasksId}`, {description: this.tasks}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
          }
      ).catch(response => {
        return response;
      });
      return task;
    },
    handleCompletedTask(task) {
      httpAxiosApiTags.post(`/tag/edit-my-tags/${this.tagsTasksId}`, {
        description: this.tasks,
        completed: task.completed
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
        }
      ).catch(response => {
        return response;
      });
      return task;
    }
  }
}
</script>
