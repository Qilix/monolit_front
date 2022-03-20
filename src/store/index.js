import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        quotes: [],
        tags: [],
    },
    mutations: {
        getQuotes(state, payload){
            state.quotes = payload
        },

        getTags(state, payload){
            state.tags = payload
        }
    },
    actions: {
        getQuotes(context){
        axios.get('http://127.0.0.1:8000/api/quotes/')
        .then(response => context.commit("getQuotes", response.data))
        },

        getTags(context){
            axios.get('http://127.0.0.1:8000/api/tag/')
            .then(response => context.commit("getTags", response.data))
        }
    },
})