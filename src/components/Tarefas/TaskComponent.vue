<template>
  <div>
    <v-list-item
    :color="cardColorCompleted"
    :class="colorPlusTransparency"
    @click="handleCompletedTask(task)"
    >
      <template v-slot:default="{}">
        <v-list-item-action>
          <v-checkbox :input-value="task.completed"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
              :class="{'text-decoration-line-through': task.completed}"
          >{{task.title}}</v-list-item-title>
          <v-list-item-subtitle
              :class="{'text-decoration-line-through': task.completed}"
          >{{task.description}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
              icon
              @click.stop="handleRemoveTask(task.id)"
          >
            <v-icon color="red lighten-1">mdi-trash-can</v-icon>
          </v-btn>
        </v-list-item-action>

      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>


export default {
  props: [
    'task',
    'cardColorCompleted',
    'colorDefault'
  ],
  data() {
    return {
      completed: false,
      colorPlusTransparency: null
    }
  },
  methods: {
    handleCompletedTask(task) {
      this.colorPlusTransparency = "";
      task.completed = !task.completed;
      if(task.completed) {
        this.colorPlusTransparency = this.cardColorCompleted + ' lighten-4';
      }
    },
    handleRemoveTask(id) {
      this.$store.commit(
          'removeTask',
          id
      );
    },
  }
}
</script>

<style>

</style>