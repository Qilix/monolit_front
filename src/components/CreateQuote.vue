<template>
    <v-dialog v-model="dialog" persistent max-width="700px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Создать запись
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Создать запись</span>
            </v-card-title>
            <v-card-text>
                <v-text-field 
                    v-model="author" 
                    :rules="authorRules" 
                    :counter="20" 
                    label="Имя" 
                    required>
                </v-text-field>
            </v-card-text>

            <v-card-text class="pt-4">
                <v-textarea class="quote-area"
                    outlined v-model="quote" 
                    :rules="quoteRules" 
                    :counter="5000"
                    label="Цитата" 
                    no-resize required>
                </v-textarea>
            </v-card-text>

            <v-card-text>
                    <multiselect 
                        v-model="value"
                        :options="options"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        placeholder="Выберите тэги"
                        label="name"
                        track-by="name"
                        >
                    </multiselect>
                    <p v-if="validTag">
                        {{ validTag }}
                    </p>
                </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Закрыть
                </v-btn>
                <v-btn color="blue darken-1" text @click.prevent="Createq">
                    Сохранить
                </v-btn>
            </v-card-actions>

            
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios'
    import Multiselect from 'vue-multiselect'
    export default {
        components: {
            Multiselect
        },
        data(){
            return {
                dialog: false,
                error: null,
                author: '',
                authorRules: [
                    v => !!v.trim() || 'Введите имя',
                    v => v.length <= 20 || 'Имя должно быть не больше 20 символов'
                ],
                quote: '',
                quoteRules: [
                    v => !!v.trim() || 'Введите цитату',
                    v => v.length <= 200 || 'Цитата должна быть меньше 5000 символов'
                ],
                validTag: null,
                value: [],
            }
        },

    methods: {
        Createq(){
                axios.post('http://127.0.0.1:8000/api/quotecreate/', {
                    author: this.author,
                    text: this.quote,
                    tags: this.value.map(elem => elem.id),
                }).then(function (response) {
                    location.reload()
                    console.log(response);
                }).catch((err) => {
                    console.log(err);
                    if(err.response.status == 400){
                        alert("Заполните поля");
                        return;
                    }
                  })
            }

    },
    

  computed: {
      options(){
          return this.$store.state.tags
      }
    },

    mounted() {
        this.$store.dispatch('getTags');
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>