import Vue from 'vue'
import Vuex from 'vuex'

import category from './category.js'
import product from './product.js'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        category,
        product,
    },
})