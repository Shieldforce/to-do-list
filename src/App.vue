<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Shieldforce
          </v-list-item-title>
          <v-list-item-subtitle>
            Lista de Tarefas
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="#fcb69f"
        dark
        src="./assets/bg1.jpg"
        prominent
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Shieldforce</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import httpAxiosApiTags from "@/plugins/axiosApiTags";

export default {
  mounted() {
    this.handleRequiredToken();
  },
  methods: {
    handleLoginApiTags() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("expired");
      httpAxiosApiTags.post(`/access/login`, {
        email: process.env.VUE_APP_USER_API_TAGS,
        password: process.env.VUE_APP_PASS_API_TAGS,
      }).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('expired', new Date());
      });
    },
    handleRequiredToken() {
      var getToken = localStorage.getItem('access_token');
      var expired = localStorage.getItem('expired');
      var start = new Date(expired);
      var end = new Date();
      var diff = new Date( end - start );

      if(!getToken || getToken && diff.getUTCMinutes() > 20) {
        this.handleLoginApiTags();
      }
    },
  },
  data: () => ({
    drawer: null,
    items: [
      {
        title: 'Tags',
        icon: 'mdi-tags',
        to: '/tags'
      },
      {
        title: 'Tarefas',
        icon: 'mdi-task',
        to: '/'
      },
      {
        title: 'Sobre',
        icon: 'mdi-about',
        to: '/sobre'
      },
    ],
  })
}
</script>
Footer
