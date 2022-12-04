<template>
    <v-dialog v-model="dialog" persistent max-width="700px">
        <template v-if = !this.id v-slot:activator="{ on, attrs }">
            <v-btn elevation="5"
                   text
                   plain
                   v-bind="attrs" v-on="on">
                Создать продукт
            </v-btn>
        </template>
      <template v-else v-slot:activator="{ on, attrs }">
        <v-btn elevation="5"
               text
               plain
               v-bind="attrs" v-on="on">
          Изменить продукт
        </v-btn>
      </template>
        <v-card>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-card-title>
                <span v-if = !this.id class="text-h5">Добавить продукт</span>
                <span v-else class="text-h5">Изменить продукт</span>
            </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Имя"
                    required>
                </v-text-field>
            </v-card-text>

          <v-card-text>
            <v-text-field
                v-model="price"
                :rules="priceRules"
                label="Цена"
                required>
            </v-text-field>
          </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Закрыть
                </v-btn>
                <v-btn v-if = !this.id color="blue darken-1"  :disabled="!valid" text @click.prevent="create">
                    Сохранить
                </v-btn>
                <v-btn v-else color="blue darken-1"  :disabled="!valid" text @click.prevent="update">
                  Изменить
                </v-btn>
            </v-card-actions>

          <v-snackbar
              v-model="snackbar"
          >
            {{ error }}

            <template v-slot:action="{ attrs }">
              <v-btn
                  color="pink"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import {createProduct, updateProduct} from '../api/instance';
    export default {
      props:{
        id: String | Number,
      },
        data(){
            return {
              name: '',
              price: '',

              error:'',

              dialog: false,
              snackbar: false,
              valid: true,

              nameRules:[v => !!v || 'Введите название'],
              priceRules:[v => !!v || 'Введите цену' ],
            }
        },

    methods: {
      create(){
          createProduct({
            name: this.name,
            price: this.price,
          }).then(res => {
            this.name = ''
            this.price = ''
            this.dialog = false
            this.$store.dispatch('updateProducts')
          }).catch(err => {
              if (err.response.status === 422) {
                this.snackbar = true
                this.error = err.response.data.message
              }
          })
        },

      update(){
        updateProduct(this.id,{
          name: this.name,
          price: this.price,
        }).then(res => {
          this.name = ''
          this.price = ''
          this.dialog = false
          this.$store.dispatch('updateProducts')
        }).catch((err) => {
          if (err.response.status === 422) {
            this.snackbar = true
            this.error = err.response.data.message
          }
        })
      }
      },


  computed: {
    },

}
</script>
