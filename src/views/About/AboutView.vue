<template>
  <div>
    <v-container>
      <v-banner two-line>
        <v-avatar
            slot="icon"
            color="deep-purple accent-4"
            size="40"
        >
          <v-icon
              icon="mdi-lock"
              color="white"
          >
            mdi-lock
          </v-icon>
        </v-avatar>

        Sistema de lista de tarefas para ajudar as rotinas do dia a dia, com essa lista você pode organizar melhor suas tarefas e suas metas.
        Com a possibilidade de organizar por data, categoria, agendamento, etc...

        <template v-slot:actions>
          <v-btn
              text
              color="deep-purple accent-4"
              to="/"
          >
            Tarefas
          </v-btn>
        </template>
      </v-banner>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AboutView',

  components: {},

  data: () => ({
    links: [
      {
        title: 'Tarefas',
        icon: 'mdi-task',
        to: '/'
      }
    ],
  })
}
</script>
