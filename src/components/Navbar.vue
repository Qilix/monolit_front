<template>
     <v-container class="d-flex justify-center pt-5">
      <v-app-bar
          max-width="1200px"
          elevation="4"
          outlined
        >
        <h1>Monolit</h1>
        <div class = "ml-5">
          <v-menu
              bottom
              :offset-y="true">
            <template
                v-slot:activator="{ on, attrs }">
              <v-list-item
                  link
                  v-bind="attrs"
                  v-on="on"
              >
               <h3>Продукты</h3>
              </v-list-item>
            </template>

            <v-list>
              <EditProduct/>
              <v-list-item
                  v-for="item in this.menuProducts"
                  :key="item.title"
                  link
                  @click="actionsProducts(item.action)"
              >
                <v-list-item-title>
                  {{
                    item.title
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div>
          <v-menu
              bottom
              :offset-y="true">
            <template
                v-slot:activator="{ on, attrs }">
              <v-list-item
                  link
                  v-bind="attrs"
                  v-on="on"
              >
                <h3>Категории</h3>

              </v-list-item>
            </template>

            <v-list>
              <EditCategory/>
              <v-list-item
                  v-for="item in this.menuCategory"
                  :key="item.title"
                  link
                  @click="actionsCategories(item.action)"
              >
                <v-list-item-title>
                  {{
                    item.title
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </div>
        <v-spacer/>
        </v-app-bar >
    </v-container>
</template>

<script>
import EditProduct from '@/components/EditProduct'
import EditCategory from '@/components/EditCategory'


export default {
  components: {
    EditProduct,
    EditCategory

  },
  data() {
    return {
      menuProducts: [
        {
          title: "Получить продукты",
          action: "getProducts"
        },
      ],

      menuCategory: [
        {
          title: "Получить категории",
          action: "getCategories"
        },
      ]
    }
  },

  methods: {
    actionsProducts(action) {
      switch (action) {
        case 'getProducts':
          this.$router.push({name: "products"})
          break;
      }
    },

    actionsCategories(action)
    {
      switch (action) {
        case 'getCategories':
          this.$router.push({name: "categories"})
          break;
      }
    }
  }
}
</script>