<template>
    <div>
        <v-container v-if="!quotes.length">
            <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600" v-for="n in 5" :key="n">
                <v-skeleton-loader type="article, actions"></v-skeleton-loader>
            </v-card>
        </v-container>

        <v-container v-else>
            <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600" 
            v-for="quote in quotes"
             :key="quote.id">
                    <v-list-item-content>
                        <v-list-item-title class="text-h5 font-weight-bold">{{ quote.author }}</v-list-item-title>
                        <v-list-item-subtitle>{{ quote.date }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-card-text class="px-0 text-h6">
                        {{ quote.text }}
                    </v-card-text>

                    <div class="d-flex flex-row-reverse">
                        <v-chip class="tags" v-for="tag in quote.tags" :key="tag.id"
                        color="purple"
                        outlined
                        label
                        >{{ tag }}</v-chip>
                    </div>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default{
    name: 'Home',
    computed: {
        quotes() {
            return this.$store.state.quotes;
        }
    },

    mounted() {
        this.$store.dispatch('getQuotes');
    }
}

</script>

<style>
.tags{
    margin: 10px 6px;
}
</style>  