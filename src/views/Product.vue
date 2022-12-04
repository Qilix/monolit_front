<template>
    <div>
        <v-container v-if="!products">
            <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600" v-for="n in 5" :key="n">
                <v-skeleton-loader type="products, actions"></v-skeleton-loader>
            </v-card>
        </v-container>

        <v-container v-else>
            <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600" 
            v-for="product in products"
             :key="product.id">
              <v-row class="mt-1 ml-1">
                    <v-list-item-content>
                        <v-list-item-title class="text-h5 font-weight-bold">{{ product.name }}</v-list-item-title>
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
                    <EditProduct v-bind:id=product.id></EditProduct>
                  </v-list-item>
                  <v-dialog
                      v-model="dialog"
                      persistent
                      max-width="500"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item
                          v-bind="attrs"
                          v-on="on"
                      >
                        <v-list-item-title>Удалить</v-list-item-title>
                      </v-list-item>
                    </template>
                    <v-card>
                      <v-card-title class="text-h6">
                        Вы уверены что хотите удалить статью?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            @click="dialog = false"
                        >
                          Отмена
                        </v-btn>
                        <v-btn
                            color="error"
                            @click="deleteProd(product.id)"
                        >
                          Удалить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list>
              </v-menu>
              </v-row>
                    <v-card-text class="px-0 text-h6">
                       Цена: {{ product.price }}
                    </v-card-text>

            </v-card>
        </v-container>
    </div>
</template>

<script>
import {deleteProduct} from '../api/instance';
import EditProduct
  from "@/components/EditProduct";
export default{
  name: 'Product',
  data() {
    return {
      dialog: false,
      snackbar: false,
      message: null,
      status: false,
    }
  },
  components: {
    EditProduct,
  },

  computed: {
        products() {
            return this.$store.state.product.products;
        }
    },

  methods: {
    deleteProd(id){
      this.snackbar = true
      deleteProduct(id).then((result) =>{
        this.message = result.data.message
        this.status = true
        this.$store.dispatch('updateProducts');
      }).catch((err) => {
        if (err.response.status === 422) {
          this.message = err.response.data.message
        }
      })
      this.dialog = false
    }
  },

    mounted() {
        this.$store.dispatch('updateProducts');
    }
}

</script>