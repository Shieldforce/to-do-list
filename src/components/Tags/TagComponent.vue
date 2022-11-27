<template>
  <div>
    <v-list-item
    color=""
    class=""
    >
      <template v-slot:default="{}">
        <v-list-item-content>
          <v-list-item-title
              class=""
          >{{tag.title}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title
              class=""
          >
            <v-icon
                size="25"
                :color="`${visibility.color} darken-2`"
                :title="visibility.title"
            >
              {{visibility.icon}}
            </v-icon>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
              icon
              @click.stop="handleRemoveTag(tag)"
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
    'tag',
    'removeTag',
  ],
  data() {
    return {
      visibility : {
        icon : this.$props.tag.visibility ? 'mdi-lock-open' : 'mdi-lock',
        title : this.$props.tag.visibility ? 'Público' : 'Privado',
        color : this.$props.tag.visibility ? 'green' : 'red'
      }
    }
  },
  methods: {
    handleRemoveTag(tag) {
      this.removeTag(tag);
    }
  }
}
</script>

<style>

</style>