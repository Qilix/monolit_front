import {getCategories} from '../api/instance';

export default {

    state: {
        categories: [],
        includeProducts: 0,
    },

    mutations: {
        updateCategories(state, categories) {
            state.categories = categories;
        },
        setIncludeProducts(state, includeProducts){
            state.includeProducts = includeProducts;
        }
    },

    actions: {
        updateCategories(context) {
            let includeProducts = context.state.includeProducts
            getCategories(includeProducts).then((result) => {
                const jsonRes = result.data
                context.commit('updateCategories', jsonRes.data)
            });
        },
        setInclude(context, includeProducts){
            context.commit('setIncludeProducts', includeProducts)
        }
    },
}