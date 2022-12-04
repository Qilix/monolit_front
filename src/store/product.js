import {getProducts} from '../api/instance';

export default {

    state: {
        products: [],
    },

    mutations: {
        updateProducts(state, products) {
            state.products = products;
        },
    },

    actions: {
        updateProducts(context) {
            getProducts().then((result) => {
                const jsonRes = result.data
                context.commit('updateProducts', jsonRes.data)
            });
        },
    },
}