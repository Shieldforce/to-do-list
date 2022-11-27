<template>
  <div>
    <v-container>
      <div class="container">
        <v-form
            ref="formAddTagValid"
            v-model="formAddTagValid"
            @submit.prevent="handleSaveTag"
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
                  color="blue darken-2"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                sm="5"
            >
              <v-select
                  :items="items"
                  item-text="label"
                  item-value="value"
                  label="Escolha a visibilidade"
                  v-model="visibility"
                  clearable
                  :rules="visibilityRules"
                  required
                  color="blue darken-2"
              ></v-select>
            </v-col>

            <v-col
                cols="12"
                sm="2"
            >
              <v-btn
                  type="submit"
                  x-large
                  style="width: 100%"
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

          <v-col
              cols="12"
              md="12"
              v-show="skeleton"
          >
            <v-skeleton-loader
                v-bind="attrs"
                type="article"
            ></v-skeleton-loader>
          </v-col>


          <v-list-item-group
              multiple
              active-class=""
          >
            <div
                v-for="(tag) in this.$store.state.tags.tags"
                :key="tag.id"
            >
              <TagComponent
                  :tag="tag"
                  :removeTag="handleRemoveTag"
              />

            </div>
          </v-list-item-group>

          <PaginationCollectionComponent
              :paginationItems="this.$store.state.tags.paginationTags"
              @sendEventPaginationNext="sendEventPaginationNext"
              :paginate="this.paginate"
              commitMutationList="getTags"
          />

        </v-list>
      </div>
    </v-container>
  </div>
</template>

<script>
import TagComponent from "@/components/Tags/TagComponent";
import PaginationCollectionComponent from "@/components/Pagination/PaginationCollectionComponent";

export default {
  name: 'TagsView',
  components: {
    PaginationCollectionComponent,
    TagComponent

  },
  mounted() {
    this.$store.commit('getTags', { paginate:this.paginate, page:this.currenPage });
    this.skeleton = false;
  },
  data() {
    return {
      skeleton : true,
      attrs: {
        // class: 'mb-12',
        // boilerplate: false,
        // elevation: 10,
      },
      formAddTagValid : false,
      items : [
          {label: 'Público', value: true},
          {label: 'Privado', value: false},
      ],
      tags: this.$store.state.tags.tags,
      titleRules: [
        v => !!v || 'Título é obrigatório!',
        v => (v && v.length <= 30) || 'Título deve ser menor ou igual a 30!',
      ],
      title: null,
      visibility: null,
      loading: false,
      visibilityRules: [
        v => v!==null || 'Visibilidade é obrigatório!',
      ],
      lastPageCount: null,
      currenPage: 1,
      paginate: 5
    }
  },
  methods: {
    handleSaveTag() {
      this.loading = true;
      if (!this.$refs.formAddTagValid.validate()) {
        this.loading = false;
        return;
      }
      this.handleAddTag();
      this.$refs.formAddTagValid.reset();
      this.loading = false;
    },
    handleRemoveTag(tag){
      this.$store.commit("destroyTag", tag);
      this.$store.commit('getTags', { paginate:this.paginate, page: this.currenPage });
    },
    handleAddTag() {
      this.$store.commit("createTag", {
        title: this.title,
        description: "[]",
        visibility: this.visibility
      });
      this.$store.commit('getTags', { paginate:this.paginate, page: this.currenPage });
    },
    sendEventPaginationNext(data) {
      this.currenPage = data.currentPage;
    }
  }
}
</script>
