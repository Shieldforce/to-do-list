<template>
  <div>
    <v-container>

      <v-select
          :items="this.$store.state.tags.tags"
          item-text="title"
          item-value="id"
          label="Escolha a Tag para gerenciar!"
          v-model="selectedTagValue"
          @change="handleChangeSelectTags(selectedTagValue)"
      ></v-select>

      <v-form
          ref="formAddTaskvalid"
          v-model="formAddTaskvalid"
          @submit.prevent="createTasks"
          lazy-validation
      >
        <v-row>
          <v-col
              cols="12"
              sm="5"
          >
            <v-text-field
                v-model="title"
                label="Título"
                clearable
                :rules="titleRules"
                :counter="30"
                required
                :disabled="disabledForm"
                color="blue darken-2"
            ></v-text-field>
          </v-col>

          <v-col
              cols="12"
              sm="5"
          >
            <v-text-field
                v-model="description"
                label="Descrição"
                clearable
                :rules="descriptionRules"
                :counter="191"
                required
                :disabled="disabledForm"
                color="blue darken-2"
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
              v-for="(task) in this.$store.state.tasks.tasks"
              :key="task.id"
          >
            <TaskComponent
                :task="task"
                cardColorCompleted="green"
                colorDefault="green"
                :completedTask="handleCompletedTask"
                :selectedTagValue="selectedTagValue"
            />
          </div>
        </v-list-item-group>
      </v-list>

    </v-container>
  </div>
</template>

<script>
import TaskComponent from "@/components/Tasks/TaskComponent";

export default {
  name: 'TasksView',
  components: {
    TaskComponent
  },
  mounted() {
    this.$store.commit('getTags', { paginate:999999999, page:1 });
    this.$store.commit('getTasks', this.selectedTagValue);
  },
  data() {
    return {
      selectedTagValue: null,
      disabledForm: true,
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
    createTasks() {
      this.loading = true;
      if (!this.$refs.formAddTaskvalid.validate()) {
        this.loading = false;
        return;
      }
      this.$store.commit("createTasks", {
        tagId : this.selectedTagValue,
        id: new Date().getTime(),
        order: 0,
        title: this.title,
        description: this.description,
        completed: false
      });
      this.$refs.formAddTaskvalid.reset();
      this.loading = false;
    },
    handleCompletedTask(task) {
      this.$store.commit("completedTask", { task:task, tagId:this.selectedTagValue })
    },
    handleChangeSelectTags(id) {
      if (id) {
        this.disabledForm = false;
        this.selectedTagValue = id;
        this.$store.commit('getTasks', this.selectedTagValue);
      }
    }
  }
}
</script>
