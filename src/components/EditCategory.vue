<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <template v-if=this.id v-slot:activator="{ on, attrs }">
      <v-btn
          elevation="5"
             text
             plain
             v-bind="attrs" v-on="on">
        Редактировать категорию
      </v-btn>
    </template>
    <template v-else v-slot:activator="{ on, attrs }">
      <v-btn elevation="5"
             text
             plain
             v-bind="attrs" v-on="on">
        Создать категорию
      </v-btn>
    </template>
    <v-card>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-card-title>
          <span v-if=this.id class="text-h5">Редактировать категорию</span>
          <span v-else class="text-h5">Создать категорию</span>
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
              v-model="parent_id"
              label="Родитель"
              required>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn v-if=this.id color="blue darken-1"  :disabled="!valid" text @click.prevent="update">
            Изменить
          </v-btn>
          <v-btn v-else color="blue darken-1"  :disabled="!valid" text @click.prevent="create">
            Сохранить
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
import {createCategory, updateCategory} from '../api/instance';
export default {
  props:{
    id: String | Number,
  },
  data(){
    return {
      name: '',
      parent_id: null,

      error:'',

      dialog: false,
      snackbar: false,
      valid: true,

      nameRules:[v => !!v || 'Введите название'],
    }
  },

  methods: {
    create(){
      createCategory({
        name: this.name,
        parent_id: this.parent_id,
      }).then(res => {
        this.name = ''
        this.parent_id = null
        this.dialog = false
        this.$store.dispatch('updateCategories')
      }).catch(err => {
        if (err.response.status === 422) {
          this.snackbar = true
          this.error = err.response.data.message
        }
      })
    },

    update(){
      updateCategory(this.id,{
        name: this.name,
        parent_id: this.parent_id,
      }).then(res => {
        this.name = ''
        this.parent_id = null
        this.dialog = false
        this.$store.dispatch('updateCategories')
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
