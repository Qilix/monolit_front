<template>
  <div>
    <v-container v-if="!categories">
      <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600" v-for="n in 5" :key="n">
        <v-skeleton-loader type="categories, actions"></v-skeleton-loader>
      </v-card>
    </v-container>

    <v-container v-else>
      <v-container
        class="px-0 d-flex justify-center"
        fluid
    >
      <v-checkbox
          v-model = includeProducts
          :label="`Показать продукты`"
          :value=1
          v-on:change="setIncludeProd"
      ></v-checkbox>
    </v-container>
      <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600"
              v-for="category in categories"
              :key="category.id">
        <v-row class="mt-1 ml-1">
          <v-list-item-content>
            <v-list-item-title class="text-h5 font-weight-bold">{{ category.name }}</v-list-item-title>
          </v-list-item-content>

          <v-menu
              bottom
              :offset-y="true"
          ><v-spacer></v-spacer>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="black"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <EditCategory v-bind:id=category.id></EditCategory>
              </v-list-item>
              <v-list-item>
                <v-btn
                    elevation="5"
                    text
                    plain
                    @click="$router.push ({ name: 'productsincategory', params:{id: category.id}})"
                >
                  Подробнее
                </v-btn>

              </v-list-item>
              <v-list-item>
                <v-btn
                    elevation="5"
                    text
                    plain
                    @click="$router.push ({ name: 'productswithcategories', params:{id: category.id}})"
                >
                  Продукты и зависимые категории
                </v-btn>

              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-card-text class="px-0 text-h6">
          Категория родитель: {{ category.parent_id }}
        </v-card-text>


        <v-list v-if="includeProducts === 1" dense>
          <v-subheader>Products</v-subheader>
          <v-list-item-group
              v-for="product in category.products"
              :key="product.id">
            <v-list-item>{{ product.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import EditCategory from "@/components/EditCategory";
export default{
  name: 'Category',
  data () {

    return {
      includeProducts: 0,
    }
  },

  components: {
    EditCategory
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    }
  },

  methods:{
    setIncludeProd(){
      if (this.includeProducts === null){
        this.includeProducts = 0
      }
    }
  },

  watch:{
    includeProducts(){
      this.$store.dispatch('setInclude', this.includeProducts);
      this.$store.dispatch('updateCategories');
    }
  },

  mounted() {
    this.$store.dispatch('updateCategories');
  }
}
</script>
