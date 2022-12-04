<template>
  <div>
    <v-container
        class="px-0 d-flex justify-center"
        fluid
    >
      <v-checkbox
          v-model = includeChildrens
          :label="`Показать вложенные категории`"
          :value=1
          v-on:change="setChildrenCat"
      ></v-checkbox>
    </v-container>
  <v-container v-if="!products">
    <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600">
      <v-skeleton-loader type="categories, actions"></v-skeleton-loader>
    </v-card>
  </v-container>

  <v-card v-else
          class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600">
    <v-list dense>
      <v-subheader>Products</v-subheader>
      <v-list-item-group
          v-for="product in products"
          :key="product.id">
        <v-list-item>{{ product.name }}</v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
    <v-card
            class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600">
      <v-list dense>
        <v-subheader>Categories</v-subheader>
        <v-list-item-group
            v-for="categories in childrenCategories"
            :key="categories.id">
          <v-list-item>{{ categories.name }}</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import {getProductsWithCategories} from '../api/instance';
export default {
  name: "ProductsWithCategories",

  props: {
    id: String | Number
  },

  data() {
    return {
      products: null,
      childrenCategories: null,
      includeChildrens: 0,
    }
  },

  methods: {
    refresh() {
      getProductsWithCategories(this.id, this.includeChildrens).then((result) => {
        this.products = result.data.data.products;
        this.childrenCategories = result.data.data.childrenCategories;
      })
    },

    setChildrenCat(){
      if (this.includeChildrens === null){
        this.includeChildrens = 0
      }
    }

  },
  watch:{
    includeChildrens(){
      this.refresh()
    }
  },
  mounted() {
    this.refresh()
  },
}
</script>

