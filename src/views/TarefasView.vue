<template>
  <div>
    <v-container>
      <div>
        <v-form
        validate
        @submit.prevent="handleSaveTask"
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
                v-for="(task) in $store.state.tasks"
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
import TaskComponent from "@/components/Tarefas/TaskComponent";

export default {
  name: 'TarefasView',

  components: {
    TaskComponent
  },
  data() {
    return {
      title: null,
      description: null,
      loading: false,
      completed: false,
    }
  },
  methods: {
    handleSaveTask() {
      this.loading = true;

      this.$store.commit(
          'addTask',
          {
            title: this.title,
            description: this.description
          }
      );

      this.title = "";
      this.description = "";

      this.loading = false;
    }
  },
}
</script>
