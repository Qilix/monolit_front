<template>
  <div>
    <v-container v-if="!category">
      <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600">
        <v-skeleton-loader type="categories, actions"></v-skeleton-loader>
      </v-card>
    </v-container>
  <v-card v-else
      class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600">
    <v-row class="mt-1 ml-1">
      <v-list-item-content >
        <v-list-item-title class="text-h5 font-weight-bold">{{ category.name }}</v-list-item-title>
      </v-list-item-content>

    </v-row>
    <v-card-text class="px-0 text-h6">
      Категория родитель: {{ category.parent_id }}
    </v-card-text>

    <v-list dense>
      <v-subheader>Products</v-subheader>
      <v-list-item-group
          v-for="product in category.products"
          :key="product.id">
        <v-list-item>{{ product.name }}</v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  </div>
</template>


<script>
import {getProductsInCategory} from '../api/instance';
export default {
  name: "CategoryDetail",

  props: {
    id: String | Number
  },

  data(){
    return{
      category: null,
    }
  },

  methods: {
    refresh() {
      getProductsInCategory(this.id).then((result) => {
        this.category = result.data.data;
      })
    }

  },
 mounted() {
    this.refresh()
  },
}
</script>
