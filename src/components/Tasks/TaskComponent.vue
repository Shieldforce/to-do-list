<template>
  <div>
    <v-list-item
    :color="completedColor"
    :class="colorPlusTransparency"
    @click="handleCompletedTask(task)"
    >
      <template v-slot:default="{}">
        <v-list-item-action>
          <v-checkbox :input-value="task.completed"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
              :class="titleDecoration"
          >{{task.title}}</v-list-item-title>
          <v-list-item-subtitle
              :class="subTitleDecoration"
          >{{task.description}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
              icon
              @click.stop="handleRemoveTask(task)"
          >
            <v-icon color="red lighten-1">mdi-trash-can</v-icon>
          </v-btn>
        </v-list-item-action>

      </template>
    </v-list-item>
    <v-divider :light="!!task.completed" :dark="task.completed"></v-divider>
  </div>
</template>

<script>

export default {
  props: [
    'task',
    'tasks',
    'colorDefault',
    'removeTask',
    'completedTask',
  ],
  data() {
    return {
      completedColor : this.$props.task.completed ? 'green' : 'red',
      tasksScoped: this.$props.tasks,
      completed: false,
      titleDecoration: this.$props.task.completed ? 'text-decoration-line-through' : '',
      subTitleDecoration: this.$props.task.completed ? 'text-decoration-line-through' : '',
      colorPlusTransparency: this.$props.task.completed ? 'green lighten-4' : ''
    }
  },
  methods: {
    handleCompletedTask(task) {

      this.colorPlusTransparency = "";
      this.titleDecoration = '';
      this.subTitleDecoration = '';
      this.completedColor = '';

      task.completed = !task.completed;

      if(task.completed) {
        this.completedColor = 'green';
        this.colorPlusTransparency = this.completedColor + ' lighten-4';
        this.titleDecoration = 'text-decoration-line-through';
        this.subTitleDecoration = 'text-decoration-line-through';
      }

      this.completedTask(task);

    },
    handleRemoveTask(task) {
      this.$props.tasks.splice(task, 1);
      this.removeTask(task);
    }
  }
}
</script>

<style>

</style>