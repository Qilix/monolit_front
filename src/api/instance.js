import axios from 'axios'

const ax = axios.create({
    withCredentials: false,
    baseURL: process.env.VUE_APP_APIURL
})

export const getProducts = () => {
    return ax.get('products');
};

export const createProduct = (data) => {
    return ax.post('products', data)
};

export const updateProduct = (id, data) => {
    return ax.post('products/' + id, data);
};

export const deleteProduct = (id) => {
    return ax.delete('products/' + id);
};

export const getCategories = (includeProducts) => {
    return ax.get('categories/?includeProducts=' + includeProducts);
};

export const createCategory = (data) => {
    return ax.post('categories/', data)
};

export const updateCategory = (id, data) => {
    return ax.post('categories/' + id, data);
};

export const getProductsInCategory = (id) => {
    return ax.get('categories/' + id + '?includeProducts=1');
};

export const getProductsWithCategories = (id, includeChildren) => {
    return ax.get('categories/' + id + '/products?includeChildren=' + includeChildren);
};


